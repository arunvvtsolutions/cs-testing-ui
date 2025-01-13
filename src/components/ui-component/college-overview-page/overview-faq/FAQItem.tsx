import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Arrow from '@mui/icons-material/ExpandMore'; // Import Arrow icon
import parse from 'html-react-parser';

import styles from './Faq.module.css';

import { IErrorProps } from 'types';

interface FAQ {
  faqId: number;
  collegeId: string;
  sections: string;
  addedDate: string;
  question: string;
  answer: string;
}

export interface IFAQData {
  faq?: FAQ[]; // Array of FAQItem objects
}

export interface IFAQsProps extends IErrorProps {
  shortName: string;
  faqData?: IFAQData;
}

const FAQItem: React.FC<IFAQData> = ({ faq }) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const handleAccordionClick = (index: number) => {
    setSelectedItem(index === selectedItem ? null : index); // Toggles the selection of an accordion item.
  };

  return (
    <>
      {faq &&
        faq.map((f) => (
          <Accordion
            className={`${styles.mainFaq} ${selectedItem === f.faqId && styles.selected}`}
            key={f.faqId}
            expanded={selectedItem === f.faqId}
            elevation={0}
            data-test-id={`faq-${f.faqId}`}
          >
            <AccordionSummary
              className={`${styles.questionFaq} ${selectedItem === f.faqId && styles.selected}`}
              expandIcon={<Arrow className={`${styles.arrow} ${selectedItem === f.faqId ? styles.selected : ''}`} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              onClick={() => handleAccordionClick(f.faqId)}
            >
              <Typography className={`${styles.questionTitle} ${selectedItem === f.faqId ? styles.selected : ''}`}>
                {f.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.accBLock}>
              <Typography className={styles.answerFaq}>{parse(f.answer)}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
    </>
  );
};

export default FAQItem;
