import { Box } from '@chakra-ui/layout';
import React from 'react';
import OnlyFor from '../common/components/OnlyFor';
// const iconDict = require('../common/utils/iconDict.json');

export default {
  title: 'Components/OnlyFor',
  component: OnlyFor,
  argTypes: {
    withBanner: {
      control: 'boolean',
    },
    onlyMember: {
      control: 'boolean',
    },
    onlyTeachers: {
      control: 'boolean',
    },
    include: {
      control: 'text',
    },
    exclude: {
      control: 'text',
    },
    permission: {
      control: 'text',
    },
    cohortSession: {
      control: 'object',
    },
    academy: {
      control: 'number',
    },
    capabilities: {
      control: 'hide',
    },
    storyTranslation: {
      control: 'hide',
    },
  }
};

const Component = (args) => {
  const { permission, include, exclude } = args;
  const permissionArray = typeof permission === 'string' ? permission.split(',') : permission;
  const includeArray = typeof include === 'string' ? include.split(',') : include;
  const excludeArray = typeof exclude === 'string' ? exclude.split(',') : exclude;
  const allCapabilities = [...permissionArray, ...includeArray, ...excludeArray];

  return (
    <Box width="36rem">
      <OnlyFor
        storyTranslation={args?.translation?.[args?.locale]?.common}
        width="400px"
        {...args}
        capabilities={allCapabilities}
      />
    </Box>
  );
};
export const Default = Component.bind({});
Default.args = {
  onlyMember: false,
  onlyTeachers: false,
  withBanner: true,
  permission: '',
  include: 'get_my_certificate,join_cohort,join_mentorship',
  exclude: 'crud_assignment',
  profile: {
    permissionsSlug: ['join_cohort', 'join_mentorship'],
  },
  cohortSession: {
    academy: {
      id: 4,
    },
    cohort_role: 'STUDENT',
  },
  academy: null,
  children: <Box>Content to hide</Box>,
};