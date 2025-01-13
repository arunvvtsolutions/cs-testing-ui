import { CollegeDetailsLink } from './styles';

interface CollegeDetailsButtonProps {
  name: string;
  link: string;
  names: string;
  insType: string;
}

const CollegeDetailsButton: React.FC<CollegeDetailsButtonProps> = ({ name, link, names, insType }) => {
  return (
    <CollegeDetailsLink href={`/${insType}/${names}/${link}`} data-test-id="listing-page-card-details-btn">
      {name}
    </CollegeDetailsLink>
  );
};

export default CollegeDetailsButton;
