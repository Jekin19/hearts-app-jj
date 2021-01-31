import { PropsWithChildren } from 'react';

interface RenderIfProps {
  validate: boolean;
}

const RenderIf = ({ validate, children }: PropsWithChildren<RenderIfProps>) => (validate ? <>{children}</> : <></>);

export { RenderIf };
