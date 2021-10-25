import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Popover,
  Link,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import NextChakraLink from '../NextChakraLink';
import Icon from '../Icon';
import Image from '../Image';
import logo from '../../../../public/static/images/bc_logo.png';

const NavbarWithSubNavigation = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useTranslation(['navbar']);

  const NAV_ITEMS = [
    {
      label: 'Inspiration',
      subMenu: [
        {
          label: 'Explore Design Work',
          subLabel: 'Trending Design to inspire you',
          href: '#',
        },
        {
          label: 'New & Noteworthy',
          subLabel: 'Up-and-coming Designers',
          href: '#',
        },
      ],
    },
    {
      label: 'Find Work',
      subMenu: [
        {
          label: 'Job Board',
          subLabel: 'Find your dream design job',
          href: '#',
        },
        {
          label: 'Freelance Projects',
          subLabel: 'An exclusive list for contract work',
          href: '#',
        },
      ],
    },
    {
      label: 'Learn Design',
      href: '#',
    },
    {
      label: 'Hire Designers',
      href: '#',
    },
  ];

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        // minH="60px"
        height="10vh"
        py={{ base: '8px' }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align="center"
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            _hover={{
              background: colorMode === 'light' ? 'white' : 'gray.800',
            }}
            _active={{
              background: colorMode === 'light' ? 'white' : 'gray.800',
            }}
            background={colorMode === 'light' ? 'white' : 'gray.800'}
            icon={
              isOpen ? (
                <Icon icon="close" width="15px" height="15px" />
              ) : (
                <Icon icon="hamburger" width="22px" height="22px" />
              )
            }
            variant="default"
            aria-label="Toggle Navigation"
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          {/* NOTE: Put logo here */}
          <NextChakraLink href="/" alignSelf="center">
            <Image src={logo} width="30px" height="30px" alt="Breathecode logo" />
          </NextChakraLink>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav NAV_ITEMS={NAV_ITEMS} />
          </Flex>
        </Flex>

        <Stack flex={{ base: 1, md: 0 }} justify="flex-end" direction="row" spacing={6}>
          <IconButton
            display={useBreakpointValue({ base: 'none', md: 'flex' })}
            _hover={{
              background: colorMode === 'light' ? 'white' : 'gray.800',
            }}
            _active={{
              background: colorMode === 'light' ? 'white' : 'gray.800',
            }}
            background={colorMode === 'light' ? 'white' : 'gray.800'}
            onClick={toggleColorMode}
            icon={
              colorMode === 'light' ? (
                <Icon icon="light" width="25px" height="23px" color="black" />
              ) : (
                <Icon icon="dark" width="20px" height="20px" />
              )
            }
          />
          <NextChakraLink
            href="/example"
            fontWeight="700"
            fontSize="13px"
            lineHeight="22px"
            _hover={{
              textDecoration: 'none',
            }}
            letterSpacing="0.05em"
          >
            <Button
              display={useBreakpointValue({ base: 'none', md: 'flex' })}
              width="100px"
              fontWeight={400}
              variant="default"
            >
              {t('login')}
            </Button>

            <IconButton
              display={useBreakpointValue({ base: 'auto', md: 'none' })}
              _hover={{
                background: colorMode === 'light' ? 'white' : 'gray.800',
              }}
              _active={{
                background: colorMode === 'light' ? 'white' : 'gray.800',
              }}
              background={colorMode === 'light' ? 'white' : 'gray.800'}
              icon={<Icon icon="user" style={{ margin: '0 auto' }} width="30px" height="30px" />}
            />
          </NextChakraLink>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav NAV_ITEMS={NAV_ITEMS} />
      </Collapse>
    </Box>
  );
};

const DesktopNav = ({ NAV_ITEMS }) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction="row" spacing={4} alignItems="center">
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover id={navItem.href ?? 'trigger-64'} trigger="hover" placement="bottom-start">
            <PopoverTrigger>
              <Link
                display="flex"
                alignItems="center"
                p={2}
                href={navItem.href ?? '#'}
                fontSize="sm"
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
                {navItem.subMenu && (
                  <Icon icon="arrowDown" color="gray" width="22px" height="22px" />
                )}
              </Link>
            </PopoverTrigger>

            {navItem.subMenu && (
              <PopoverContent
                border={0}
                boxShadow="xl"
                bg={popoverContentBgColor}
                p={4}
                rounded="xl"
                minW="sm"
              >
                <Stack>
                  {navItem.subMenu.map((child) => {
                    const { label, subLabel, href } = child;
                    return (
                      <DesktopSubNav key={label} label={label} subLabel={subLabel} href={href} />
                    );
                  })}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => (
  <Link
    href={href}
    role="group"
    display="block"
    p={2}
    rounded="md"
    _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
  >
    <Stack direction="row" align="center">
      <Box>
        <Text transition="all .3s ease" _groupHover={{ color: 'pink.400' }} fontWeight={500}>
          {label}
        </Text>
        <Text fontSize="sm">{subLabel}</Text>
      </Box>
      <Flex
        transition="all .3s ease"
        transform="translateX(-10px)"
        opacity={0}
        _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
        justify="flex-end"
        align="center"
        flex={1}
      >
        <Icon icon="arrowRight" color="pink" width="20px" height="20px" />
      </Flex>
    </Stack>
  </Link>
);

const MobileNav = ({ NAV_ITEMS }) => (
  <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
    {NAV_ITEMS.map((navItem) => {
      const { label, subMenu, href } = navItem;
      return <MobileNavItem key={label} label={label} subMenu={subMenu} href={href} />;
    })}
  </Stack>
);

const MobileNavItem = ({ label, subMenu, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={subMenu && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify="space-between"
        align="center"
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {subMenu && (
          <Box
            display="flex"
            transition="all .25s ease-in-out"
            transform={isOpen ? 'rotate(180deg)' : ''}
          >
            <Icon icon="arrowDown" color="gray" width="25px" height="25px" />
          </Box>
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft="2px solid"
          // borderStyle="solid"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align="start"
        >
          {subMenu
            && subMenu.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

MobileNav.propTypes = {
  NAV_ITEMS: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
      subMenu: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          subLabel: PropTypes.string.isRequired,
          href: PropTypes.string.isRequired,
        }),
      ),
    }),
  ),
};

DesktopNav.propTypes = {
  NAV_ITEMS: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
      subMenu: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          subLabel: PropTypes.string,
          href: PropTypes.string,
        }),
      ),
    }),
  ),
};

DesktopSubNav.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  subLabel: PropTypes.string.isRequired,
};

MobileNavItem.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  subMenu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      subLabel: PropTypes.string,
      href: PropTypes.string,
    }),
  ),
};
DesktopNav.defaultProps = {
  NAV_ITEMS: [
    {
      href: '#',
    },
  ],
};

MobileNav.defaultProps = {
  NAV_ITEMS: [
    {
      href: '#',
    },
  ],
};

DesktopSubNav.defaultProps = {
  href: '#',
};

MobileNavItem.defaultProps = {
  href: '#',
  subMenu: undefined,
};

export default NavbarWithSubNavigation;
