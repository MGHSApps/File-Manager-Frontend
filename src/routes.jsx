import Admin from './pages/Admin';
import ForgotPassword from './pages/ForgotPassword';
import Guide from './pages/Guide';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Submission from './pages/Submission';
import SubmissionManager from './pages/SubmissionManager';
import SubmittedTasks from './pages/submittedTasks';
import Video from './pages/Video';
import VideoResources from './pages/VideoResources';

export const links = {
    home: { 
        path: "/", 
        component: Home, 
        withNav: true, 
        withSubmenu: false, 
        withHeader: false,
        inSubmenu: false,
        title: "Home",
    },
    guide: { 
        path: "/guide", 
        component: Guide, 
        withNav: true, 
        withSubmenu: true, 
        withHeader: true,
        inSubmenu: true,
        title: "Guide",
    },
    videoResources: {
        path: "/video-resources/:id", 
        component: VideoResources, 
        withNav: true, 
        withSubmenu: true, 
        withHeader: true,
        inSubmenu: true,
        title: "Video Resources",
        children: {} 
    },
    video: {
        path: "/video/:id", 
        component: Video, 
        withNav: true, 
        withSubmenu: true, 
        withHeader: true,
        inSubmenu: false,
        title: "Video",
        children: {} 
    },
    submissionManager: {
        path: "/submission-manager", 
        component: SubmissionManager, 
        withNav: true, 
        withSubmenu: true, 
        withHeader: true,
        title: "Tasks", 
        inSubmenu: true,
        children: {
            submissions:{
                path: "/submission-manager/submissions", 
                component: SubmittedTasks, 
                withNav: true, 
                withSubmenu: true, 
                withHeader: true,
                title: "Submissions", 
                inSubmenu: true,
            }
         }
    },
    submission: {
        path: "/submission-manager/:id", 
        component: Submission, 
        withNav: true, 
        withSubmenu: true, 
        withHeader: true,
        inSubmenu: false,
        title: "Submisson",
    },
    admin: {
        path: "/admin", 
        component: Admin, 
        withNav: true, 
        withSubmenu: true, 
        withHeader: true,
        inSubmenu: true,
        title: "Admin Page",
        requiredRole: "admin",
    },
    
    forgotpassword: {
        path: "/forgot-password", 
        component: ForgotPassword, 
        withNav: false, 
        withSubmenu: false, 
        withHeader: false,
        inSubmenu: false,
        title: "Forgot Password",
    },
    profile: {
        path: "/profile", 
        component: Profile, 
        withNav: true, 
        withSubmenu: true, 
        withHeader: true,
        title: "Profile",
        inSubmenu: false,
    },
    login: { 
        path: "/login", 
        component: Login, 
        withNav: false, 
        withSubmenu: false, 
        withHeader: false,
        title: "Login",
        inSubmenu: false,
    },
    signup: { 
        path: "/signup", 
        component: Signup, 
        withNav: false, 
        withSubmenu: false, 
        withHeader: false,
        title: "Signup",
        inSubmenu: false,
    },
};
