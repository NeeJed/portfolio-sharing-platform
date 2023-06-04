import {configureStore} from '@reduxjs/toolkit';
import UserStore from './UserStore';
import CertificateStore from './CertificateStore';
import StudentsStore from './StudentsStore';
import LocationStore from './LocationStore';

export default configureStore({
    reducer: {
        user: UserStore,
        certificate: CertificateStore,
        students: StudentsStore,
        location: LocationStore,
    }
});