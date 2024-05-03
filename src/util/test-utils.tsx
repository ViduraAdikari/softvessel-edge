import React, {PropsWithChildren, ReactElement} from 'react';
import {render, RenderOptions} from "@testing-library/react";

type AllTheProvidersProps = {
  children: React.ReactNode
}

const AllTheProviders: React.FC<AllTheProvidersProps> = (props: PropsWithChildren<AllTheProvidersProps>) => {
  return <>{props.children}</>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, {wrapper: AllTheProviders, ...options});

export * from '@testing-library/react';
export {customRender as render};
