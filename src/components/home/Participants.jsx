import React from "react";
import Slider from "react-slick";

import Button from "@material-ui/core/Button"

import Image from "../editables/Image";
import PlainText from "../editables/PlainText";

const MAX_SLIDES = 8


const Participants = ({ participants, onSave, onDelete, isEditingPage }) => {
  const onSavePassthrough = (index, fieldId) => content => {
    const newParticipants = [...participants]
    newParticipants[index][fieldId] = content
    onSave(newParticipants)
  }

  const collection = participants || [];

  const sliderSettings = {
    infinite: true,
    autoplay: (!isEditingPage),
    slidesToShow: collection.length > MAX_SLIDES ? MAX_SLIDES : collection.length,
    slidesToScroll: 1,
  }
  return (
    <Slider { ...sliderSettings }>
      {collection.map((participant, i) => {
        return(
          <div className="slide" key={`participant-${i}`}>
            {
              isEditingPage ?
              <Image content={ participant["logo"] } onSave={onSavePassthrough(i, "logo")} showCaption={false} editCaption={true} /> :
              <a href={ participant["link"] ? participant["link"]["text"] : null } target="_blank" rel="noopener noreferrer">
                <Image content={ participant["logo"] } onSave={onSavePassthrough(i, "logo")} showCaption={false} editCaption={true} />
              </a>
            }
            { isEditingPage &&
              <div>
                <PlainText content={ participant["link"] } onSave={onSavePassthrough(i, "link")} />
                <Button onClick={onDelete(i)}>Delete</Button>
              </div>
            }
          </div>
        )
      })}
    </Slider>
  );
};

export default Participants;
