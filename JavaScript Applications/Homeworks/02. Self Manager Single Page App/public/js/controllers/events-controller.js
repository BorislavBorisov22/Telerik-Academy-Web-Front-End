import { data } from 'data';
import { templateLoader } from 'template-loader';

class EventsController {
    showEventsPage(context) {
        const promises = [templateLoader.load('events'), data.eventsGetAll()];

        Promise.all(promises)
            .then(data => {
                const template = data[0];
                const eventsData = data[1];

                console.log(eventsData);

                $('#container').html(template(eventsData));
            });
    }

    showAddEventPage(context) {
        const promises = [templateLoader.load('add-event'), data.userGetAll()];

        Promise.all(promises)
            .then(resData => {
                const template = resData[0];
                const usersData = resData[1];

                $('#container').html(template(usersData));

                $('#add-event-form').on('submit', function() {
                    const eventTitle = $('#tb-event-title').val();
                    const eventDescription = $('#tb-event-description').val();
                    const involedUsers = [].slice.apply($('.involved-user'))
                        .filter(x => {
                            const $currentCheckbox = $(x);

                            return $currentCheckbox.prop('checked');
                        })
                        .map(x => $(x).parent().text());

                    const event = {
                        title: eventTitle,
                        description: eventDescription,
                        users: involedUsers
                    };

                    data.eventsAdd(event)
                        .then(() => {
                            toastr.success('Event successfully added');
                            context.redirect('#/events');
                        })
                        .catch(() => {
                            toastr.error("Please try again later", "There was an error adding event!");
                        });
                });
            });
    }
}

const eventsController = new EventsController();

export { eventsController };