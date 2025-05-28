import type { ComponentType, JSX } from 'react';
import { useEffect } from 'react';

type WithLoggerProps<P> = P & JSX.IntrinsicAttributes;

function withLogger<P>(WrappedComponent: ComponentType<P>): ComponentType<WithLoggerProps<P>> {
  const ComponentWithLogging = (props: WithLoggerProps<P>) => {
    useEffect(() => {
      console.log('Props recibidas:', props);
    }, [props]);

    return <WrappedComponent {...props} />;
  };

  ComponentWithLogging.displayName = `WithLogger(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithLogging;
}

export default withLogger;



