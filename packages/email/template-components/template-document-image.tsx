import { Column, Img, Row, Section } from '../components';

export interface TemplateDocumentImageProps {
  assetBaseUrl: string;
  className?: string;
}

export const TemplateDocumentImage = ({ assetBaseUrl, className }: TemplateDocumentImageProps) => {
  const getAssetUrl = (path: string) => {
    let base = assetBaseUrl;

    if (!base.endsWith('/')) {
      base = `${base}/`;
    }

    return new URL(path.replace(/^\/+/, ''), base).toString();
  };

  return (
    <Section className={className}>
      <Row className="table-fixed">
        <Column />

        <Column>
          <Img className="mx-auto h-42" src={getAssetUrl('/static/document.png')} alt="Omni Sign" />
        </Column>

        <Column />
      </Row>
    </Section>
  );
};

export default TemplateDocumentImage;
