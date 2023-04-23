import { _EuiThemeColorsMode } from '@elastic/eui/src/global_styling/variables/colors';

export interface ItemsList {
    type: string;
    title: string;
    items: Subscription[] | Process[];
    buttonName: string;
}

export interface TotalStat {
    icon: string;
    name: string;
    value: number;
    color: keyof _EuiThemeColorsMode;
}

export interface Subscription {
    name: string;
    subscription_id: string;
    description: string;
    product: Product;
    product_id: string;
    status: string;
    insync: boolean;
    customer_id: string;
    start_date: number;
    end_date: number;
    note: string;
}

export interface Process {
    pid: string;
    workflow: string;
    assignee: string;
    last_status: string;
    failed_reason: string;
    traceback: string;
    step: string;
    created_by: string;
    started_at: number;
    last_modified_at: number;
    is_task: boolean;
}

export interface Product {
    name: string;
    tag: string;
    description: string;
    product_id: string;
    created_at: number;
    product_type: string;
    end_date: number;
    status: string;
    fixed_inputs: [];
    workflows: [];
    product_blocks: [];
    create_subscription_workflow_key: string;
    modify_subscription_workflow_key: string;
    terminate_subscription_workflow_key: string;
}
