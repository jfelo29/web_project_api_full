import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute( {
    isloggedIn,
    children,
    
}) 
{
    const location = useLocation();
 

    if ( !isloggedIn) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    
    return children;
}

    