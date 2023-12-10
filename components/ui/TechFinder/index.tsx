'use client';
import React, { type FormEventHandler, useState } from 'react';
import LabelError from '@/components/ui/LabelError/LabelError';
import Button from '@/components/ui/Button';
import Textarea from '@/components/ui/Textarea';
import {SearchableDropdown} from '@/components/ui/SearchableDropdown';
import 'react-range-slider-input/dist/style.css';

const techTypes = [
    { value: 'image_indentification', label: 'Image Indentification' },
    { value: 'fake_reviews_identification', label: 'Fake Reviews Identification' }
];

export default () => {
    const [techType, setTechType] = useState();
    const [techInExchange, setTechInExchange] = useState('');
    const [techTypeError, setTechTypeError] = useState('');
    const [providesBranding, setBranding] = useState('');
    const [desc, setDesc] = useState('');

    return (
        <div className="flex w-full rounded-xl p-5 flex-col gap-1 bg-[#f3f3f3] md:gap-2 items-center justify-end">
            <div className='flex flex-col w-full'>
                <div className="px-2 flex items-center text-center gap-3">
                    <p><span className="text-2xl font-bold mb-4 text-black text-sm">Search Tech you're looking for</span></p>
                </div>
                <div className="px-2 flex flex-col">       
                    <div className='flex w-full'>
                        <div className='flex text-start mt-2 w-1/2'>
                            <SearchableDropdown 
                                options={techTypes} 
                                placeholder={"Select Tech Type"} 
                                className={"w-full"}
                                value={techType}
                                containerClass={'w-full mr-4'}
                            />
                            <LabelError className="mt">{techTypeError}</LabelError>
                        </div>
                        <div className='flex text-start mt-2 w-1/2'>
                            <SearchableDropdown 
                                options={techTypes} 
                                placeholder={"Tech in Exchange ( Optional ) "} 
                                className={"text-start w-full"}
                                containerClass={'w-full'}
                                value={techInExchange}
                            />
                        </div>
                    </div>
                  
                    <div className='flex w-full'>
                        <div className='text-start mt-2 w-full'>
                            <Textarea
                                value={desc}
                                onChange={e => {
                                    setDesc((e.target as HTMLInputElement).value);
                                }}
                                className="w-full h-18 bg-slate-600 text-[#1d1e1f] bg-[#f9fafb] hover:bg-[#f9fafb] focus:bg-[#f9fafb]"
                                placeholder='Anything else you want to add'
                            />
                        </div>
                    </div>
                    <div className='flex-w-full'>
                        <Button className='text-white w-full'> Search </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
