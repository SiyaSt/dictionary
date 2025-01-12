import { FC } from "react";
import "./WordDef.scss";

interface WordDefProps {
  isExpanded: boolean;
  definition: string;
  pronunciation: string;
}

export const WordDef: FC<WordDefProps> = ({
  isExpanded,
  definition,
  pronunciation,
}) => {
  return (
    <>
      {isExpanded && (
        <div className="details-section">
          <hr />
          <div className="detail-item">
            <span className="detail-label">Definition:</span> {definition}
          </div>
          <div className="detail-item">
            <span className="detail-label">Pronunciation:</span> {pronunciation}
          </div>
        </div>
      )}
    </>
  );
};
