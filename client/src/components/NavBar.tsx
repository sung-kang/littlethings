import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Logout, NavBarLogo, NavBarProfile } from '@/components';
import navBarAccordionData from '@/utils/navBarData';

const NavBar = () => {
  const [activeAccordionContent, setActiveAccordionContent] = useState(
    'littlethings-overview'
  );
  const [activeAccordionItem, setActiveAccordionItem] = useState('item-1');

  const activeAccordionContentStyle =
    'text-lg text-center bg-lt-purple-2 text-white rounded-xl py-2 hover:bg-lt-purple-1';
  const inactiveAccordionContentStyle =
    'text-lg text-center text-lt-purple-2 hover:text-lt-purple-1 py-2 hover:underline';

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setActiveAccordionContent('littlethings-overview');
        break;
      case '/summary':
        setActiveAccordionContent('littlethings-summary');
        break;
      default:
        setActiveAccordionContent('littlethings-overview');
    }
  }, []);

  return (
    <div className="flex flex-col h-screen gap-2 rounded-xl shadow-md bg-gray-100 w-64">
      <NavBarLogo />
      <NavBarProfile />
      <Accordion
        type="single"
        collapsible
        defaultValue={activeAccordionItem}
        className="shadow-md rounded-xl"
      >
        {navBarAccordionData?.map((item, idx) => (
          <AccordionItem key={item.accordionItem} value={`item-${idx + 1}`}>
            <AccordionTrigger className="text-lt-blue-1 text-2xl bg-white font-bold px-4 rounded-xl">
              {item.accordionItem}
            </AccordionTrigger>
            {item.accordionItemContent.map((content) => (
              <AccordionContent
                key={content.key}
                className={
                  activeAccordionContent === content.key
                    ? activeAccordionContentStyle
                    : inactiveAccordionContentStyle
                }
              >
                <Link
                  onClick={() => {
                    setActiveAccordionContent(content.key);
                    setActiveAccordionItem(`item-${idx + 1}`);
                  }}
                  to={content.path}
                >
                  {content.label}
                </Link>
              </AccordionContent>
            ))}
          </AccordionItem>
        ))}
      </Accordion>
      <div className="flex-grow"></div>
      <Logout />
    </div>
  );
};

export default NavBar;
