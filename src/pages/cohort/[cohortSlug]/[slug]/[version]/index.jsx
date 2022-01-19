import React, { useEffect } from 'react';
import {
  Box,
  Flex,
  Container,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import mockData from '../../../../../common/utils/mockData/DashboardView';
import NextChakraLink from '../../../../../common/components/NextChakraLink';
import TagCapsule from '../../../../../common/components/TagCapsule';
import ModuleMap from '../../../../../common/components/ModuleMap';
import useModuleMap from '../../../../../common/store/actions/moduleMapAction';
import CohortSideBar from '../../../../../common/components/CohortSideBar';
import Icon from '../../../../../common/components/Icon';
import SupportSidebar from '../../../../../common/components/SupportSidebar';
import CallToAction from '../../../../../common/components/CallToAction';
import ProgressBar from '../../../../../common/components/ProgressBar';
import Heading from '../../../../../common/components/Heading';
import asPrivate from '../../../../../common/context/PrivateRouteWrapper';
import useAuth from '../../../../../common/hooks/useAuth';

const dashboard = ({ slug }) => {
  const { updateModuleStatus } = useModuleMap();
  const { user } = useAuth();
  const router = useRouter();
  const handleModuleStatus = (event, module) => {
    event.stopPropagation();
    if (module.status === 'inactive') updateModuleStatus({ ...module, status: 'active' });
    else if (module.status === 'active') updateModuleStatus({ ...module, status: 'finished' });
    else if (module.status === 'finished') updateModuleStatus({ ...module, status: 'active' });
  };

  const {
    tapCapsule, callToAction, moduleMap, cohortSideBar, supportSideBar, progressBar,
  } = mockData;

  useEffect(() => {
    if (!user.active_cohort) router.push('/choose-program');
  }, []);

  return (
    <div>
      <Container maxW="container.xl">
        <Box marginTop="17px" marginBottom="17px">
          <NextChakraLink
            href="/"
            color="#0097CF"
            display="inline-flex"
            _focus={{ boxShadow: 'none', color: '#0097CF' }}
          >
            <Icon
              icon="arrowLeft"
              width="20px"
              height="20px"
              style={{ marginBottom: '-4px', marginRight: '4px' }}
              color="#0097CF"
            />
            Back to Dashboard
          </NextChakraLink>
        </Box>
        <Flex
          justifyContent="space-between"
          flexDirection={{
            base: 'column', sm: 'column', md: 'row', lg: 'row',
          }}
        >
          <Box>
            <Heading as="h1" size="xl">
              Full Stack Developer
              {' '}
              {slug}
            </Heading>
            <TagCapsule tags={tapCapsule.tags} separator={tapCapsule.separator} />
            <Box>
              <CallToAction
                background={callToAction.background}
                title={callToAction.title}
                text={callToAction.text}
                width="100%"
              />
            </Box>
            <Box marginTop="36px">
              <ProgressBar
                programs={progressBar.programs}
                progressText={progressBar.progressText}
                width="100%"
              />
            </Box>
            <Box height="1px" bg="gray.dark" marginY="32px" />
            <Box>
              <Heading size="m">MODULE MAP</Heading>
            </Box>
            <Box marginTop="30px">
              <ModuleMap
                title={moduleMap.title}
                description={moduleMap.description}
                modules={moduleMap.modules}
                handleModuleStatus={handleModuleStatus}
                width="100%"
              />
            </Box>
          </Box>
          <Box width="10rem" />
          <Box>
            <CohortSideBar
              title={cohortSideBar.title}
              cohortCity={cohortSideBar.cohortCity}
              professor={cohortSideBar.professor}
              assistant={cohortSideBar.assistant}
              classmates={cohortSideBar.classmates}
              width="100%"
            />
            <Box marginTop="30px">
              <SupportSidebar
                title={supportSideBar.title}
                subtitle={supportSideBar.subtitle}
                actionButtons={supportSideBar.actionButtons}
                width="100%"
              />
            </Box>
          </Box>
        </Flex>
      </Container>
    </div>
  );
};

export const getServerSideProps = async ({
  params: {
    cohortSlug, slug, version,
  },
}) => ({
  props: {
    cohortSlug,
    slug,
    version,
  },
});

export default asPrivate(dashboard);
