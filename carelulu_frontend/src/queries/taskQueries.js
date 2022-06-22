import { gql } from '@apollo/client';


export const TASK_QUERIES = {
    taskList: gql`
        query listTasks($taskData: TaskData) {
            listTasks(taskData: $taskData) {
                data {
                    id
                    description
                    priority
                    is_completed
                    created_at
                    updated_at
                }
                pageInfo {
                    count
                    pages
                    hasNext
                    currPage
                }
            }
        }
    `,

    taskUpdate: gql`
        mutation updateTask($taskData: TaskData) {
            updateTask(taskData: $taskData) {
                id
                description
                priority
                is_completed
                created_at
                updated_at
            }
        }
    `,
    taskCreate: gql`
        mutation createTask($taskData: TaskData) {
            createTask(taskData: $taskData) {
                id
                description
                priority
                is_completed
                created_at
                updated_at
            }
        }
    `,
    taskDelete: gql`
        mutation deleteTask($id: Int) {
            deleteTask(id: $id) {
                id
                description
                priority
                is_completed
                created_at
                updated_at
            }
        }
    `,
};
