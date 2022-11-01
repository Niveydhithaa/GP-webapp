import { FC } from 'react';
// import { useAppSelector } from 'app/hooks';
import { Navigate } from 'react-router-dom';

interface PropType {
    component: React.FC;
}

const PrivateRoute: FC<PropType> = ({ component: Component }) => {
    const user = sessionStorage.getItem("user")

    if (user=="true") return <Component />;
    return <Navigate to='/' />;
};

export default PrivateRoute;