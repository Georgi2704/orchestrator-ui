import React from 'react';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

import { PATH_START_NEW_TASK } from '@/components';
import { ToastTypes } from '@/contexts';
import { GET_WORKFLOWS_FOR_DROPDOWN_LIST_GRAPHQL_QUERY } from '@/graphqlQueries/workflows/workflowsQueryForDropdownList';
import {
    useEngineStatusQuery,
    useQueryWithGraphql,
    useToastMessage,
} from '@/hooks';

import {
    WfoButtonComboBox,
    WorkflowComboBoxOption,
} from '../WfoButtonComboBox/WfoButtonComboBox';

export const WfoStartTaskButtonComboBox = () => {
    const router = useRouter();
    const t = useTranslations('common');
    const tErrors = useTranslations('errors');
    const { isEngineRunningNow } = useEngineStatusQuery();
    const toastMessage = useToastMessage();

    const { data } = useQueryWithGraphql(
        GET_WORKFLOWS_FOR_DROPDOWN_LIST_GRAPHQL_QUERY,
        {
            // Avoiding pagination by fetching an unrealistic amount of items
            first: 1000,
            after: 0,
            filterBy: [{ field: 'target', value: 'SYSTEM' }],
        },
        'taskWorkflows',
    );

    const taskList: WorkflowComboBoxOption[] = (data?.workflows.page || [])
        .map(({ name, description }) => ({
            label: description ?? '',
            data: { workflowName: name },
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

    const handleOptionChange = async (
        selectedProduct: WorkflowComboBoxOption,
    ) => {
        const isEngineRunning = await isEngineRunningNow();

        if (!isEngineRunning) {
            return toastMessage.addToast(
                ToastTypes.ERROR,
                tErrors('notAllowedWhenEngineIsNotRunningMessage'),
                tErrors('notAllowedWhenEngineIsNotRunningTitle'),
            );
        }

        const { workflowName } = selectedProduct.data;
        router.push({
            pathname: `${PATH_START_NEW_TASK}/${workflowName}`,
        });
    };

    return (
        <WfoButtonComboBox
            buttonText={t('newTask')}
            options={taskList}
            onOptionChange={handleOptionChange}
            isProcess={false}
        />
    );
};
