import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import QuestionReplayAccordion, {
  IReplayStateProps,
  IQuestionProps
} from 'ui-component/college-question-page/question-replay-accordion';
import { postQuestions, postReplay } from 'utils/api/questions';
import ErrorComponent from 'ui-component/error';
import { IInnerPageParams } from 'types';
import useAuth from 'hooks/useAuth';

export interface IQuestion {
  question: string;
  collegeUrl?: string | string[];
  studentId: string | undefined;
}

const QuestionReplay: React.FC<IQuestionProps> = ({ profileData, hasError }) => {
  const { user } = useAuth();
  const params = useParams<IInnerPageParams>();
  const name = params?.name;

  const [newQuestion, setNewQuestion] = useState<string>('');
  const [newReplay, setNewReplay] = useState<string>('');
  const [questionId, setQuestionId] = useState<number>(0);
  const [questionData, setQuestionData] = useState<IQuestion>({
    question: '',
    collegeUrl: name,
    studentId: user?.id
  });
  const [replay, setReplayState] = useState<IReplayStateProps>({
    answer: ' ',
    collegeUrl: name,
    questionId: questionId,
    studentId: user?.id
  });
  useEffect(() => {
    const data = {
      answer: newReplay,
      collegeUrl: name,
      questionId: questionId,
      studentId: user?.id
    };
    setReplayState(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, newReplay, questionId]);

  useEffect(() => {
    const data = {
      question: newQuestion,
      collegeUrl: name,
      studentId: user?.id
    };
    setQuestionData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, newQuestion]);
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        <QuestionReplayAccordion
          data-test-id="question-replay"
          newReply={newReplay}
          replayState={replay}
          setNewReply={setNewReplay}
          newQuestion={newQuestion}
          setNewQuestion={setNewQuestion}
          data={questionData}
          postQuestions={postQuestions}
          postQuestionAnswer={postReplay}
          setQuestionId={setQuestionId}
          profileData={profileData}
          // replayData={replayData}
        />
      )}
    </>
  );
};

export default QuestionReplay;
