/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    '\n    query GetSubscriptionDetailOutline($id: ID!) {\n        subscription(id: $id) {\n            subscriptionId\n            customerId\n            description\n            fixedInputs\n            insync\n            note\n            product {\n                createdAt\n                name\n                status\n                endDate\n                description\n                tag\n                type\n            }\n            endDate\n            startDate\n            status\n            organisation {\n                abbreviation\n                name\n                website\n                tel\n            }\n            productBlocks {\n                id\n                ownerSubscriptionId\n                parent\n                resourceTypes\n            }\n        }\n    }\n':
        types.GetSubscriptionDetailOutlineDocument,
    '\n    query GetSubscriptionDetailComplete($id: ID!) {\n        subscription(id: $id) {\n            subscriptionId\n            customerId\n            description\n            fixedInputs\n            insync\n            note\n            product {\n                createdAt\n                name\n                status\n                endDate\n                description\n                tag\n                type\n            }\n            endDate\n            startDate\n            status\n            organisation {\n                abbreviation\n                name\n                website\n                tel\n            }\n            productBlocks {\n                id\n                ownerSubscriptionId\n                parent\n                resourceTypes\n            }\n        }\n    }\n':
        types.GetSubscriptionDetailCompleteDocument,
    '\n    query SubscriptionGrid(\n        $first: Int!\n        $after: Int!\n        $sortBy: [SubscriptionsSort!]\n        $filterBy: [[String!]!]\n    ) {\n        subscriptions(\n            first: $first\n            after: $after\n            sortBy: $sortBy\n            filterBy: $filterBy\n        ) {\n            edges {\n                node {\n                    note\n                    name\n                    startDate\n                    endDate\n                    tag\n                    vlanRange\n                    description\n                    product {\n                        name\n                        type\n                        tag\n                    }\n                    organisation {\n                        abbreviation\n                        name\n                    }\n                    insync\n                    status\n                    subscriptionId\n                }\n            }\n        }\n    }\n':
        types.SubscriptionGridDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    query GetSubscriptionDetailOutline($id: ID!) {\n        subscription(id: $id) {\n            subscriptionId\n            customerId\n            description\n            fixedInputs\n            insync\n            note\n            product {\n                createdAt\n                name\n                status\n                endDate\n                description\n                tag\n                type\n            }\n            endDate\n            startDate\n            status\n            organisation {\n                abbreviation\n                name\n                website\n                tel\n            }\n            productBlocks {\n                id\n                ownerSubscriptionId\n                parent\n                resourceTypes\n            }\n        }\n    }\n',
): (typeof documents)['\n    query GetSubscriptionDetailOutline($id: ID!) {\n        subscription(id: $id) {\n            subscriptionId\n            customerId\n            description\n            fixedInputs\n            insync\n            note\n            product {\n                createdAt\n                name\n                status\n                endDate\n                description\n                tag\n                type\n            }\n            endDate\n            startDate\n            status\n            organisation {\n                abbreviation\n                name\n                website\n                tel\n            }\n            productBlocks {\n                id\n                ownerSubscriptionId\n                parent\n                resourceTypes\n            }\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    query GetSubscriptionDetailComplete($id: ID!) {\n        subscription(id: $id) {\n            subscriptionId\n            customerId\n            description\n            fixedInputs\n            insync\n            note\n            product {\n                createdAt\n                name\n                status\n                endDate\n                description\n                tag\n                type\n            }\n            endDate\n            startDate\n            status\n            organisation {\n                abbreviation\n                name\n                website\n                tel\n            }\n            productBlocks {\n                id\n                ownerSubscriptionId\n                parent\n                resourceTypes\n            }\n        }\n    }\n',
): (typeof documents)['\n    query GetSubscriptionDetailComplete($id: ID!) {\n        subscription(id: $id) {\n            subscriptionId\n            customerId\n            description\n            fixedInputs\n            insync\n            note\n            product {\n                createdAt\n                name\n                status\n                endDate\n                description\n                tag\n                type\n            }\n            endDate\n            startDate\n            status\n            organisation {\n                abbreviation\n                name\n                website\n                tel\n            }\n            productBlocks {\n                id\n                ownerSubscriptionId\n                parent\n                resourceTypes\n            }\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    query SubscriptionGrid(\n        $first: Int!\n        $after: Int!\n        $sortBy: [SubscriptionsSort!]\n        $filterBy: [[String!]!]\n    ) {\n        subscriptions(\n            first: $first\n            after: $after\n            sortBy: $sortBy\n            filterBy: $filterBy\n        ) {\n            edges {\n                node {\n                    note\n                    name\n                    startDate\n                    endDate\n                    tag\n                    vlanRange\n                    description\n                    product {\n                        name\n                        type\n                        tag\n                    }\n                    organisation {\n                        abbreviation\n                        name\n                    }\n                    insync\n                    status\n                    subscriptionId\n                }\n            }\n        }\n    }\n',
): (typeof documents)['\n    query SubscriptionGrid(\n        $first: Int!\n        $after: Int!\n        $sortBy: [SubscriptionsSort!]\n        $filterBy: [[String!]!]\n    ) {\n        subscriptions(\n            first: $first\n            after: $after\n            sortBy: $sortBy\n            filterBy: $filterBy\n        ) {\n            edges {\n                node {\n                    note\n                    name\n                    startDate\n                    endDate\n                    tag\n                    vlanRange\n                    description\n                    product {\n                        name\n                        type\n                        tag\n                    }\n                    organisation {\n                        abbreviation\n                        name\n                    }\n                    insync\n                    status\n                    subscriptionId\n                }\n            }\n        }\n    }\n'];

export function graphql(source: string) {
    return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
    TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
