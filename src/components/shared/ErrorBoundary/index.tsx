 import React from 'react';
 import { ErrorBoundary } from "react-error-boundary";

 const logError = (error: Error, info: { componentStack: string }) => {
   console.log('error', error);
   console.log('info', info);
 };

 const Fallback = ({ error, resetErrorBoundary }) => {
   
   resetErrorBoundary ()
   return (
     <div role="alert">
       <p>Something went wrong:</p>
       <pre style={{ color: "red" }}>{error.message}</pre>
     </div>
   );
 }