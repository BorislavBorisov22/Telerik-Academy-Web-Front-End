import { data } from 'data';
import { templateLoader } from 'template-loader';

class HomeController {
    showHomePage() {
        templateLoader.load('home')
            .then(template => {
                $('#container').html(template());
            });
    }
}

const homeController = new HomeController();

export { homeController };