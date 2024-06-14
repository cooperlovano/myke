
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

function FaqPanel(props) {
    const {headline, questions = []} = props;

    return (
        <div className='w-full'>
            <div className='max-w-xl mx-auto'>
            <div className='mb-0'>
                <h2 className='mb-4'>{headline}</h2>
            </div>
            <div className=''>
                <Accordion collapsible type='single' className='flex flex-col gap-4'>
                    {questions.map((child, index) => (
                        <AccordionItem value={child.title} className="border rounded-xl p-2 px-4" key={index}>
                            <AccordionTrigger  className="text-base pb-0">{child.title}</AccordionTrigger>
                            <AccordionContent>
                                <div className='text-content' dangerouslySetInnerHTML={{__html: child.content}}></div>
                            </AccordionContent>
                        </AccordionItem>

                    ))}
                </Accordion>
            </div>
            </div>
        </div>
    )
}

export default FaqPanel;