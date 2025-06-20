import React, { useEffect, useRef, useState } from 'react';
import config from '../../config/config';
import { useSelector } from 'react-redux';
import { getDashboardData } from './DashboardFunctions';

export default function Birthdays({ birthDayData }) {
    const user_deatils = useSelector(store => store?.auth?.data?.user);
    const companyID = user_deatils?.companyId;
    const dashboardRedux = useSelector(store => store?.dashboard);
    const birthDayPagination = dashboardRedux?.birth_day_pagination;

    const containerRef = useRef(null);
    const [isFetching, setIsFetching] = useState(false);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const date = new Date();
    const monthName = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    const oldDays = [];
    const newDays = [];

    birthDayData.forEach((birth) => {
        const dob = new Date(birth.dateOfBirth);
        const isTodayOrLater =
            dob.getMonth() > today.getMonth() ||
            (dob.getMonth() === today.getMonth() && dob.getDate() >= today.getDate());

        if (isTodayOrLater) {
            newDays.push(birth);
        } else {
            oldDays.push(birth);
        }
    });

    oldDays.sort((a, b) => new Date(a?.dateOfBirth) - new Date(b?.dateOfBirth));
    newDays.sort((a, b) => new Date(a?.dateOfBirth) - new Date(b?.dateOfBirth));

    const renderBirthdays = (dataArray, status) =>
        dataArray.map((birth, i) => {
            const date = new Date(birth?.dateOfBirth);
            const day = date.getDate().toString().padStart(2, '0');
            const month = date.toLocaleString('default', { month: 'short' });
            const formattedDate = `${day} ${month}`;
            const name = birth?.firstName + ' ' + birth?.lastName;
            const first_letter = birth?.firstName?.charAt(0)?.toUpperCase();

            return (
                <div
                    key={birth.userId}
                    className={`${
                        i % 2 === 0 ? 'bg-[#FFF2ED]' : 'bg-[#EEEBFF]'
                    } ${status === "old" ? 'opacity-40' : ''} rounded px-5 py-2 w-full h-[56px] flex items-center gap-4`}
                >
                    <div className="flex flex-col gap-1 items-center">
                        <img
                            className="w-4 h-4"
                            src={config.PUBLIC_URL + '/assets/images/amdital/birthday_cake.svg'}
                            alt=""
                        />
                        <div className="text-[11px] font-semibold text-[#260B6A] leading-3 whitespace-nowrap">
                            {formattedDate}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full relative bg-[#806BFF] overflow-hidden">
                            {birth?.profileImage ? (
                                <img
                                    src={birth?.profileImage}
                                    alt=""
                                    className="w-full h-full rounded-full"
                                />
                            ) : (
                                <div className="text-base uppercase font-semibold text-center w-full h-full text-[#FFFFFF] flex justify-center items-center">
                                    {first_letter}
                                </div>
                            )}
                        </div>
                        <div className="text-sm font-normal text-[#26212E] leading-4 whitespace-nowrap">
                            {name}
                        </div>
                    </div>
                </div>
            );
        });

    const fetchLoadMore = async () => {
        if (isFetching || !birthDayPagination?.hasNextPage) return;
        setIsFetching(true);
        const month = new Date().getMonth() + 1;
        await getDashboardData(month, companyID, birthDayPagination?.endCursor, true);
        setIsFetching(false);
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            if (
                container.scrollTop + container.clientHeight >= container.scrollHeight - 10
            ) {
                fetchLoadMore();
            }
        };

        container.addEventListener('scroll', handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [birthDayPagination?.endCursor]);

    return (
        <div
            ref={containerRef}
            className={`w-[315px] ${
                newDays.length > 0 ? 'min-h-[255.25px] max-h-[255.25px]' : 'min-h-[150px] max-h-[255.25px]'
            } bg-[#FFFFFF] border border-[#E1DCFF] rounded-lg px-[14px] pt-[14px] pb-5 overflow-y-auto`}
        >
            <div className="flex items-center justify-between">
                <div className="text-base font-semibold leading-5 text-[#26212E]">Birthdays</div>
                <div className="text-[16px] font-semibold text-[#260B6A]">
                    {monthName} {year}
                </div>
            </div>
            <div className="mt-[14px] relative flex gap-[10px] flex-col">
                {oldDays.length > 0 && renderBirthdays(oldDays, 'old')}
                {newDays.length > 0 && renderBirthdays(newDays, 'new')}
                {newDays.length === 0 && oldDays.length === 0 && (
                    <div className="w-full h-full flex items-center justify-center text-sm font-medium">
                        There are no birthdays in {monthName}.
                    </div>
                )}
                {birthDayPagination?.hasNextPage && (
                    <div className="w-full text-center text-sm text-[#666] py-2">
                        Loading more...
                    </div>
                )}
            </div>
        </div>
    );
}
