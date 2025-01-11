import React from 'react'
import {
    Accordion as AccordionUI,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


const Accordion = () => {
    return (
        <AccordionUI type="single" collapsible>
            <AccordionItem value="item-1" >
                <AccordionTrigger >Why E commerce?</AccordionTrigger>
                <AccordionContent>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem magni, laudantium dicta laborum cum animi culpa expedita aperiam iusto facere, reiciendis delectus debitis quam suscipit in nostrum at quod dolorem!
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" >
                <AccordionTrigger >Why E commerce?</AccordionTrigger>
                <AccordionContent>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem magni, laudantium dicta laborum cum animi culpa expedita aperiam iusto facere, reiciendis delectus debitis quam suscipit in nostrum at quod dolorem!
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" >
                <AccordionTrigger >Why E commerce?</AccordionTrigger>
                <AccordionContent>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem magni, laudantium dicta laborum cum animi culpa expedita aperiam iusto facere, reiciendis delectus debitis quam suscipit in nostrum at quod dolorem!
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" >
                <AccordionTrigger >Why E commerce?</AccordionTrigger>
                <AccordionContent>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem magni, laudantium dicta laborum cum animi culpa expedita aperiam iusto facere, reiciendis delectus debitis quam suscipit in nostrum at quod dolorem!
                </AccordionContent>
            </AccordionItem>
        </AccordionUI>
    )
}

export default Accordion