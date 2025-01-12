import { FC, useState } from 'react';
import Switch from '@/shared/ui/Switch/Switch';
import s from './Survey.module.scss';
import Button from '@/shared/ui/Button/Button';

type TypeSurveyProps = {
    heading: string,
    answers: {
        _id: string,
        text: string,
    }[],
    userVoted: boolean,
    onVote: Function,
};

const Survey: FC<TypeSurveyProps> = ({
  heading, answers, userVoted, onVote,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const getAnswerText = () => answers.find((answer) => selectedAnswer === answer._id).text;

  return (
    <div className={s.wrapper}>
      <div className={s.heading}>Опрос</div>
      <div className={s.question}>{ heading }</div>
      {
        !userVoted
          ? (
            <>
              <div className={s.list}>
                {
                  answers?.map((answer) => (
                    <div
                      key={answer._id}
                      className={s.item}
                    >
                      <Switch checked={answer._id === selectedAnswer} onChange={() => setSelectedAnswer(answer._id)} />
                      {answer.text}
                    </div>
                  ))
                }
              </div>
              <Button
                mode="purple"
                onClick={() => onVote(getAnswerText())}
              >
                Проголосовать
              </Button>
            </>
          )
          : <div className={s.text}>Вы уже проголосовали :)</div>
      }

    </div>
  );
};

export default Survey;
