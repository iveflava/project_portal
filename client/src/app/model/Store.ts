import { configureStore } from '@reduxjs/toolkit';
import GlobalReducer from './GlobalSlice';
import RegistrationFormReducer from '@/features/RegistrationForm/model/RegistrationFormSlice';
import LoginFormReducer from '@/features/LoginFrom/model/LoginFormSlice';
import ToasterReducer from '@/features/Toaster/model/ToasterSlice';
import SidebarReducer from '@/widgets/Sidebar/model/SidebarSlice';
import MainReducer from '@/features/Main/model/MainSlice';
import MainSidebarReducer from '@/features/MainSidebar/model/MainSidebarSlice';
import ProfileReducer from '@/features/Profile/model/ProfileSlice';
import EditProfileReducer from '@/features/EditProfile/model/EditProfileSlice';
import TeamsReducer from '@/features/Teams/model/TeamsSlice';

const store = configureStore({
  reducer: {
    global: GlobalReducer,
    registration: RegistrationFormReducer,
    login: LoginFormReducer,
    toaster: ToasterReducer,
    sidebar: SidebarReducer,
    main: MainReducer,
    mainSidebar: MainSidebarReducer,
    profile: ProfileReducer,
    editProfile: EditProfileReducer,
    teams: TeamsReducer,
  },
});

export default store;
