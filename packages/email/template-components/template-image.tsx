import { Img } from '../components';

export interface TemplateImageProps {
  assetBaseUrl: string;
  className?: string;
  staticAsset: string;
}

export const TemplateImage = ({ assetBaseUrl, className, staticAsset }: TemplateImageProps) => {
  const getAssetUrl = (path: string) => {
    let base = assetBaseUrl;

    if (!base.endsWith('/')) {
      base = `${base}/`;
    }

    return new URL(path.replace(/^\/+/, ''), base).toString();
  };

  return <Img className={className} src={getAssetUrl(`/static/${staticAsset}`)} alt="" />;
};

export default TemplateImage;
