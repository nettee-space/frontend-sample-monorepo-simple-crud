'use client';

import 'swagger-ui-react/swagger-ui.css';

import SwaggerUI from 'swagger-ui-react';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spec: Record<string, any>;
};

export function ReactSwagger({ spec }: Props) {
  return <SwaggerUI spec={spec} />;
}
