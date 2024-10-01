import app from './config/app';
import { PORT } from './config/config';
const port = PORT || 3000;

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
