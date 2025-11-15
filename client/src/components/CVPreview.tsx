
import React from 'react';
import { CVData } from '../class/types';
import TemplateClassic from './cv/templates/TemplateClassic';
import TemplateModern from './cv/templates/TemplateModern';

interface CVPreviewProps {
  cvData: CVData;
  onFocusField: (fieldId: string) => void;
  onEditAvatar: () => void;
}

// Ánh xạ từ tên template sang component tương ứng
const templateMap: { [key: string]: React.FC<CVPreviewProps> } = {
  classic: TemplateClassic,
  modern: TemplateModern,
};

const CVPreview: React.FC<CVPreviewProps> = (props) => {
  const { cvData } = props;

  // Lựa chọn component template để render, mặc định là Classic nếu không tìm thấy
  const TemplateComponent = templateMap[cvData.template] || TemplateClassic;

  return <TemplateComponent {...props} />;
};

export default CVPreview;
