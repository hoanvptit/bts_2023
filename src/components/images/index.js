import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import classNames from 'classnames';
import images from '~/assets/images';
import style from './Image.module.scss';
//fallback: customFallback: đặt tên fallback truyền vào thành customFallback cho tránh bị trùng với state,
// đặt default là images.default_avatar, nếu không truyền thì dùng default
const Image = forwardRef(({ src, alt, fallback: customFallback = images.default_avatar, className, ...props }, ref) => {
  const [fallback, setFallback] = useState('');
  const handleError = () => {
    setFallback(customFallback);
  };
  return (
    <img
      className={classNames(style.wrapper, className)}
      ref={ref}
      src={fallback || src}
      alt={alt}
      {...props}
      onError={handleError}
    />
  );
});
Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  fallback: PropTypes.string,
};
export default Image;
