import React from 'react';

import { CardImg as BaseCardImg } from 'reactstrap';
import styled from 'styled-components';

const CardImg = styled(BaseCardImg)`
  mix-blend-mode: multiply;
`;

const ImgBg = styled.div`
  background-color: ${props => props.theme.helTram};
`;

class ActionImage extends React.Component {
  render() {
    const catImages = {
      default: 'T30H0AcxthY',
      58: 'hZxv71OrD7E',
      59: 'yp71rK_ymvU',
      64: 'mN4sEfN79SE',
      67: 'H5K6HXkZXdw',
      68: '_rrroSmRdeo',
      69: 'VxoE4nUnOtI',
      73: '023T4jyCRqA',
      75: 'KnevlsuWxzk',
      77: 'b8Mwo34avAo',
    };
    const imageURL = `https://source.unsplash.com/${catImages.default}/400x150`;

    return (
      <ImgBg>
        <CardImg top width="100%" src={imageURL} alt="Action Image" />
      </ImgBg>
    );
  }
}

export default ActionImage;
