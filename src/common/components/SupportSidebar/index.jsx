import { useEffect, memo, useState } from 'react';
import {
  useToast,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import bc from '../../services/breathecode';
// import { usePersistent } from '../../hooks/usePersistent';
import Mentoring from './Mentoring';

function SupportSidebar({ allCohorts, allAcademySyllabus, services, subscriptions, subscriptionData }) {
  const { t } = useTranslation();
  const toast = useToast();
  const [programServices, setProgramServices] = useState({
    list: [],
    isFetching: true,
  });

  const filterByFinantialStatus = (list) => list.filter((service) => {
    if (allCohorts.length > 0) {
      return allCohorts.some((elem) => {
        if (elem?.cohort?.academy?.id === service?.academy?.id && (elem?.finantial_status === 'LATE' || elem?.educational_status === 'SUSPENDED')) {
          return false;
        }
        return true;
      });
    }
    return true;
  });

  useEffect(() => {
    if (services?.length === 0) {
      bc.mentorship().getService().then(({ data }) => {
        const servicesFiltered = filterByFinantialStatus(data);
        if (servicesFiltered && servicesFiltered.length > 0) {
          setProgramServices({
            list: servicesFiltered,
            isFetching: false,
          });
        }
      }).catch(() => {
        toast({
          position: 'top',
          title: 'Error',
          description: t('alert-message:error-mentorship-service'),
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
    } else {
      const servicesFiltered = filterByFinantialStatus(services);
      setProgramServices({
        list: servicesFiltered,
        isFetching: false,
      });
    }
  }, [services]);

  return programServices.list?.length > 0 && (
    <Mentoring
      allCohorts={allCohorts}
      allAcademySyllabus={allAcademySyllabus}
      programServices={programServices}
      subscriptions={subscriptions}
      subscriptionData={subscriptionData}
    />
  );
}

SupportSidebar.propTypes = {
  subscriptionData: PropTypes.shape({}),
  services: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  subscriptions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  allCohorts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  allAcademySyllabus: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
};

SupportSidebar.defaultProps = {
  subscriptionData: {},
  subscriptions: [],
  services: [],
  allCohorts: [],
  allAcademySyllabus: [],
};

export default memo(SupportSidebar);
