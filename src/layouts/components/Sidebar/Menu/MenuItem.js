import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);
function MenuItem({ title, to, icon, activeIcon }) {
  return (
    <NavLink
      className={(navdata) => {
        return cx('menu-item', { active: navdata.isActive });
      }}
      to={to}
    >
      <span className={cx('icon_regular')}>{icon}</span>
      <span className={cx('icon_active')}>{activeIcon}</span>
      <span className={cx('menu-title')}>{title}</span>
    </NavLink>
  );
}
MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};
export default MenuItem;
