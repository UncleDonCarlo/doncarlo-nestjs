import { ApiBodyOptions } from '@nestjs/swagger';

export const CreateProjectSwaggerSchema: ApiBodyOptions = {
  description: 'Create a project with image',
  schema: {
    type: 'object',
    properties: {
      name: { type: 'string', example: 'My Project' },
      description: { type: 'string', example: 'This is a project' },
      href: { type: 'string', example: 'www.uncledoncarlo.com/project' },
      img: {
        type: 'string',
        format: 'binary',
      },
    },
    required: ['name', 'description'],
  },
};
