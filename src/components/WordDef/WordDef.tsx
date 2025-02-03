import { FC } from "react";
import "./WordDef.scss";

interface WordDefProps {
  definition: string;
  pronunciation: string;
}

export const WordDef: FC<WordDefProps> = ({
  definition,
  pronunciation,
}) => {
  return (
        <div className="details-section">
          <hr />
          <div className="detail-item">
            <span className="detail-label">Definition:</span> {definition}
          </div>
          <div className="detail-item">
            <span className="detail-label">Pronunciation:</span> {pronunciation}
          </div>
        </div>
  );
};
