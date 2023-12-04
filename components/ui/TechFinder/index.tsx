'use client';
import React, { type FormEventHandler, useState } from 'react';
import LabelError from '@/components/ui/LabelError/LabelError';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label/Label';
import Button from '@/components/ui/Button';
import Textarea from '@/components/ui/Textarea';
import Checkbox from '@/components/ui/Checkbox';
import {SearchableDropdown} from '@/components/ui/SearchableDropdown';

export default () => {
    const [techType, setTechType] = useState('');
    const [techTypeError, setTechTypeError] = useState('');
    const [providesBranding, setBranding] = useState('');
    const [desc, setDesc] = useState('');

    return (
        <div className="flex border rounded-xl border-slate-800 bg-slate-800 p-5 flex-col gap-1 md:gap-2 items-center justify-end">
            <div className='flex flex-col w-full'>
                <div className="px-2 flex items-center text-center gap-3">
                    <p><span className="text-2xl font-bold mb-4 text-orange-500">Search Tech you're looking for</span></p>
                </div>
                <div className="px-2 flex flex-col">       
                    <div className='flex'>
                        <div className='text-start mt-2'>
                            <Label>Select Tech Type</Label>
                            <SearchableDropdown options={["A", "B", "C"]} placeholder={"Select Tech Type"} className={""}/>
                            <LabelError className="mt">{techTypeError}</LabelError>
                        </div>
                        <div className='text-start mt-2'>
                            <Label>Enter Budget Range</Label>
                            <Input
                                value={techType}
                                onChange={e => {
                                    setTechType((e.target as HTMLInputElement).value);
                                }}
                                className="w-full mt-2 bg-slate-600"
                            />
                            <LabelError className="mt">{techTypeError}</LabelError>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='text-start mt-2'>
                            <Label>What else can you Offer in Exchange</Label>
                            <div className='flex'>
                                <Checkbox value={providesBranding} className='ml-2'/> Free Branding
                                <SearchableDropdown options={["A", "B", "C"]} placeholder={"Tech in Exchange"} className={""}/>
                            </div>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='text-start mt-2'>
                            <Label>Anything else you want to add</Label>
                            <Textarea
                                value={desc}
                                onChange={e => {
                                    setDesc((e.target as HTMLInputElement).value);
                                }}
                                className="w-full h-28"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
