import { templateLoader } from 'template-loader';
import { data } from 'data';

class ToDoController {
    showTodosPage() {

        const promises = [templateLoader.load('todos'), data.todoGetAll()];

        Promise.all(promises)
            .then(data => {
                const template = data[0];
                let todosData = data[1];

                $('#container').html(template(todosData));
            });
    }

    showAddTodoPage(context) {
        const self = this;

        templateLoader.load('add-todo')
            .then((template) => {
                $('#container').html(template());

                $('#add-todo-form').on('submit', function() {
                    const todoToAdd = self.getTodoInfo();

                    data.todoAdd(todoToAdd)
                        .then(() => {
                            toastr.success('TODO was successully added to list!');
                            context.redirect('#/todos');
                        })
                        .catch(() => {
                            toastr.error("There was a problem with adding todo to list!");
                        });
                });
            });
    }

    getTodoInfo() {
        const text = $('#tb-todo-text').val();
        const state = $('#tb-todo-state').val() === "true" ? true : undefined;
        const category = $('#tb-to-state').val();

        const todo = {
            text,
            state,
            category
        };

        return todo;
    }

    swapTodoState(context) {
        const todoId = context.params.id;
        const todoCurrentState = context.params.state;

        data.todoSwapState(todoId, todoCurrentState)
            .then(() => {
                toastr.success('TODO state updated successfully!');
                context.redirect('#/todos');
            })
            .catch(() => {
                toastr.error("There was an error updating TODO's state");
            });
    }
}

const todoController = new ToDoController();

export { todoController };