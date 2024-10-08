import React, { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import type { Pagination } from '@elastic/eui/src/components';

import type { WfoDataSorting, WfoTableColumns } from '@/components';
import {
    DEFAULT_PAGE_SIZE,
    DEFAULT_PAGE_SIZES,
    METADATA_PRODUCT_TABLE_LOCAL_STORAGE_KEY,
    StoredTableConfig,
    WfoDateTime,
    WfoProductBlockBadge,
    WfoProductStatusBadge,
    WfoTableWithFilter,
    getDataSortHandler,
    getPageChangeHandler,
    getQueryStringHandler,
} from '@/components';
import { WfoFirstPartUUID } from '@/components/WfoTable/WfoFirstPartUUID';
import { mapSortableAndFilterableValuesToTableColumnConfig } from '@/components/WfoTable/utils/mapSortableAndFilterableValuesToTableColumnConfig';
import {
    useDataDisplayParams,
    useShowToastMessage,
    useStoredTableConfig,
} from '@/hooks';
import { useGetProductsQuery, useLazyGetProductsQuery } from '@/rtk';
import { ProductsResponse } from '@/rtk';
import { mapRtkErrorToWfoError } from '@/rtk/utils';
import type { GraphqlQueryVariables, ProductDefinition } from '@/types';
import { BadgeType, SortOrder } from '@/types';
import {
    getConcatenatedResult,
    getQueryVariablesForExport,
    parseDateToLocaleDateTimeString,
    parseIsoString,
} from '@/utils';
import {
    csvDownloadHandler,
    getCsvFileNameWithDate,
} from '@/utils/csvDownload';

import { WfoMetadataPageLayout } from './WfoMetadataPageLayout';

const PRODUCT_FIELD_PRODUCT_ID: keyof ProductDefinition = 'productId';
const PRODUCT_FIELD_NAME: keyof ProductDefinition = 'name';
const PRODUCT_FIELD_DESCRIPTION: keyof ProductDefinition = 'description';
const PRODUCT_FIELD_TAG: keyof ProductDefinition = 'tag';
const PRODUCT_FIELD_PRODUCT_TYPE: keyof ProductDefinition = 'productType';
const PRODUCT_FIELD_STATUS: keyof ProductDefinition = 'status';
const PRODUCT_FIELD_PRODUCT_BLOCKS: keyof ProductDefinition = 'productBlocks';
const PRODUCT_FIELD_FIXED_INPUTS: keyof ProductDefinition = 'fixedInputs';
const PRODUCT_FIELD_CREATED_AT: keyof ProductDefinition = 'createdAt';

type ProductDefinitionExportItem = Omit<
    ProductDefinition,
    'fixedInputs' | 'productBlocks'
> & {
    fixedInputs: string;
    productBlocks: string;
};

export const WfoProductsPage = () => {
    const t = useTranslations('metadata.products');
    const tError = useTranslations('errors');
    const { showToastMessage } = useShowToastMessage();
    const [tableDefaults, setTableDefaults] =
        useState<StoredTableConfig<ProductDefinition>>();

    const getStoredTableConfig = useStoredTableConfig<ProductDefinition>(
        METADATA_PRODUCT_TABLE_LOCAL_STORAGE_KEY,
    );

    useEffect(() => {
        const storedConfig = getStoredTableConfig();

        if (storedConfig) {
            setTableDefaults(storedConfig);
        }
    }, [getStoredTableConfig]);

    const { dataDisplayParams, setDataDisplayParam } =
        useDataDisplayParams<ProductDefinition>({
            // TODO: Improvement: A default pageSize value is set to avoid a graphql error when the query is executed
            // the fist time before the useEffect has populated the tableDefaults. Better is to create a way for
            // the query to wait for the values to be available
            // https://github.com/workfloworchestrator/orchestrator-ui/issues/261
            pageSize: tableDefaults?.selectedPageSize || DEFAULT_PAGE_SIZE,
            sortBy: {
                field: PRODUCT_FIELD_NAME,
                order: SortOrder.ASC,
            },
        });

    const tableColumns: WfoTableColumns<ProductDefinition> = {
        productId: {
            field: PRODUCT_FIELD_PRODUCT_ID,
            name: t('id'),
            width: '90',
            render: (value) => <WfoFirstPartUUID UUID={value} />,
            renderDetails: (value) => value,
        },
        name: {
            field: PRODUCT_FIELD_NAME,
            name: t('name'),
            width: '200',
            render: (name) => (
                <WfoProductBlockBadge badgeType={BadgeType.PRODUCT}>
                    {name}
                </WfoProductBlockBadge>
            ),
        },
        tag: {
            field: PRODUCT_FIELD_TAG,
            name: t('tag'),
            width: '120',
            render: (value) => (
                <WfoProductBlockBadge badgeType={BadgeType.PRODUCT_TAG}>
                    {value}
                </WfoProductBlockBadge>
            ),
        },
        description: {
            field: PRODUCT_FIELD_DESCRIPTION,
            name: t('description'),
            width: '400',
        },
        productType: {
            field: PRODUCT_FIELD_PRODUCT_TYPE,
            name: t('productType'),
        },
        status: {
            field: PRODUCT_FIELD_STATUS,
            name: t('status'),
            width: '90',
            render: (value) => <WfoProductStatusBadge status={value} />,
        },
        fixedInputs: {
            field: PRODUCT_FIELD_FIXED_INPUTS,
            name: t('fixedInputs'),
            render: (fixedInputs) => (
                <>
                    {fixedInputs.map((fixedInput, index) => (
                        <WfoProductBlockBadge
                            key={index}
                            badgeType={BadgeType.FIXED_INPUT}
                        >
                            {`${fixedInput.name}: ${fixedInput.value}`}
                        </WfoProductBlockBadge>
                    ))}
                </>
            ),
        },
        productBlocks: {
            field: PRODUCT_FIELD_PRODUCT_BLOCKS,
            name: t('productBlocks'),
            render: (productBlocks) => (
                <>
                    {productBlocks.map((block, index) => (
                        <WfoProductBlockBadge
                            key={index}
                            badgeType={BadgeType.PRODUCT_BLOCK}
                        >
                            {block.name}
                        </WfoProductBlockBadge>
                    ))}
                </>
            ),
        },
        createdAt: {
            field: PRODUCT_FIELD_CREATED_AT,
            name: t('createdAt'),
            render: (date) => <WfoDateTime dateOrIsoString={date} />,
            renderDetails: parseIsoString(parseDateToLocaleDateTimeString),
            clipboardText: parseIsoString(parseDateToLocaleDateTimeString),
        },
    };

    const { pageSize, pageIndex, sortBy, queryString } = dataDisplayParams;
    const graphqlQueryVariables: GraphqlQueryVariables<ProductDefinition> = {
        first: pageSize,
        after: pageIndex * pageSize,
        sortBy: sortBy,
        query: queryString || undefined,
    };
    const { data, isFetching, error } = useGetProductsQuery(
        graphqlQueryVariables,
    );
    const [getProductsTrigger, { isFetching: isFetchingCsv }] =
        useLazyGetProductsQuery();
    const getProductsForExport = () =>
        getProductsTrigger(
            getQueryVariablesForExport(graphqlQueryVariables),
        ).unwrap();

    const { totalItems, sortFields, filterFields } = data?.pageInfo ?? {};

    const pagination: Pagination = {
        pageSize: pageSize,
        pageIndex: pageIndex,
        pageSizeOptions: DEFAULT_PAGE_SIZES,
        totalItemCount: totalItems ? totalItems : 0,
    };

    const dataSorting: WfoDataSorting<ProductDefinition> = {
        field: sortBy?.field ?? PRODUCT_FIELD_NAME,
        sortOrder: sortBy?.order ?? SortOrder.ASC,
    };

    const mapToExportItems = ({
        products,
    }: ProductsResponse): ProductDefinitionExportItem[] =>
        products.map(
            ({
                productId,
                name,
                tag,
                description,
                productType,
                status,
                fixedInputs,
                productBlocks,
                createdAt,
            }) => ({
                productId,
                name,
                tag,
                description,
                productType,
                status,
                fixedInputs: getConcatenatedResult(fixedInputs, [
                    'name',
                    'value',
                ]),
                productBlocks: getConcatenatedResult(productBlocks, ['name']),
                createdAt,
            }),
        );

    return (
        <WfoMetadataPageLayout>
            <WfoTableWithFilter<ProductDefinition>
                data={data?.products ?? []}
                tableColumns={mapSortableAndFilterableValuesToTableColumnConfig(
                    tableColumns,
                    sortFields,
                    filterFields,
                )}
                dataSorting={dataSorting}
                defaultHiddenColumns={tableDefaults?.hiddenColumns}
                onUpdateDataSort={getDataSortHandler<ProductDefinition>(
                    setDataDisplayParam,
                )}
                onUpdatePage={getPageChangeHandler<ProductDefinition>(
                    setDataDisplayParam,
                )}
                onUpdateQueryString={getQueryStringHandler<ProductDefinition>(
                    setDataDisplayParam,
                )}
                pagination={pagination}
                isLoading={isFetching}
                error={mapRtkErrorToWfoError(error)}
                queryString={queryString}
                localStorageKey={METADATA_PRODUCT_TABLE_LOCAL_STORAGE_KEY}
                onExportData={csvDownloadHandler(
                    getProductsForExport,
                    mapToExportItems,
                    (data) => data?.pageInfo || {},
                    Object.keys(tableColumns),
                    getCsvFileNameWithDate('Products'),
                    showToastMessage,
                    tError,
                )}
                exportDataIsLoading={isFetchingCsv}
            />
        </WfoMetadataPageLayout>
    );
};
