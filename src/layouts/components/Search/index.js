import { useEffect, useState, useRef } from 'react';
import { useDebounce } from '~/hooks';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import * as searchService from '~/services/searchService';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import BtsItem from '~/components/BtsItem';
import { SearchIcon } from '~/components/icons';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);
function Search({className, placehoder}) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    const debounceValue = useDebounce(searchValue, 500);

    const classes = cx('wrapper', {
        [className]: className,
      });
    //** fake result for searching */
    const result = [
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Dong',
            location: 'Ha Dong - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Tay',
            location: 'Ha Tay - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Nam',
            location: 'Ha Nam - Ha Noi',
        },
        {
            avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/192/631560ee94071.png',
            name: ' BTS Ha Bac',
            location: 'Ha Bac - Ha Noi',
        },
    ];

    useEffect(() => {
        if (!debounceValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            //   const result = await searchService.search(debounceValue);
            setSearchResult(result);
            setLoading(false);
        };
        fetchApi();
    }, [debounceValue]);

    const handleChange = (e) => {
        const searchStr = e.target.value;
        if (!searchStr.startsWith(' ')) {
            setSearchValue(searchStr);
        }
    };
    const handleHideResult = () => {
        setShowResult(false);
    };
    return (
        //Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.
        <div className={classes}>
            <HeadlessTippy
                interactive={true}
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>BTS</h4>
                            {searchResult.map((result) => {
                                return <BtsItem key={result.id} data={result} />;
                            })}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        placeholder="Tìm kiếm"
                        spellCheck={false}
                        ref={inputRef}
                        value={searchValue}
                        onChange={handleChange}
                        onFocus={() => {
                            setShowResult(true);
                        }}
                    />

                    {!!searchValue && !loading && (
                        <button
                            className={cx('clear')}
                            onClick={() => {
                                setSearchValue('');
                                setSearchResult([]);
                                inputRef.current.focus();
                            }}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                    <button
                        className={cx('search-btn')}
                        onMouseDown={(e) => {
                            e.preventDefault();
                        }}
                    >
                        {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
