import {  useState } from 'react'

import ConfirmSubjectSelection from '@pages/Sbuject/ConfirmSubjectSelection'
import SubjectCard from '@pages/Sbuject/SubjectCard'
import useSubjectSelection from '@pages/Sbuject/hooks/useSubjectSelection'
import { AlertTriangle, BookOpen } from 'lucide-react'

import Selection from '@components/common/form/selectiom/Selection'
import { Alert, AlertTitle } from '@components/ui/alert'
import { Button } from '@components/ui/button'
import { Card, CardContent, CardHeader } from '@components/ui/card'
import { Skeleton } from '@components/ui/skeleton'

import useSelectionFroTeacher from './hooks/useSelectionFroTeacher'

ConfirmSubjectSelection

const SubjectChoice = () => {
  const { handleSubjectSelection } = useSubjectSelection()

  //const  {handleOnValueChangeSemenster,handleOnValueChangeStreams,setSelectedSubjects,draggedIndex} = useSubjectChoice()
  const {
    loadSemesterByStreamForTeacher,
    stream,
    semesters,
    selectedStream,
    load_subjects_for_teacher_choice,
    selectedSemester,
    subjects,
    toggleSubjectSelection,
    selectedSubjects,
    isSubjectLock,
    
    onDrop,
    setDraggedIndex,
    save_teacher_subject_choice,
    choice_deadline,
    saveAsDraft,
    setSaveAsDraft,
    handleOnClickForUnsaveDraft
  } = useSelectionFroTeacher()
  
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const togglePanel = () => setIsPanelOpen(!isPanelOpen)



  

  return (
    <div className="flex w-full flex-col space-y-4">
      {/* time table selection */}

      <div className="flex flex-col flex-wrap items-center justify-evenly space-y-5 lg:flex-col">
        <div className="flex w-full flex-col items-center justify-center space-y-4 md:w-auto md:flex-row md:items-start md:space-x-8 md:space-y-0 lg:space-x-12">
          {/* Stream Selection Card */}
          {stream && (

            <div className="relative w-full md:w-[240px] lg:w-[320px]">
              <Selection
                title="Stream"
                selectedValue={selectedStream}
                selectedValue2=" "
                onValueChange={loadSemesterByStreamForTeacher}
                placeholder="Select Stream"
                data={stream}
                optionTitle={null}
              />

              {!isSubjectLock &&  !saveAsDraft &&
                <div>
                  {/* Connecting Lines */}
                  <div className="absolute right-[-2rem] top-1/2 hidden h-[3px] w-8 bg-gray-400 md:block lg:right-[-3rem] lg:w-12" />
                  <div className="absolute bottom-[-1em] left-1/2 h-4 w-[3px] -translate-x-1/2 transform bg-gray-400 md:hidden" />
                </div>}

            </div>

          )}
          {
            !isSubjectLock  && !saveAsDraft &&
             <div className="relative w-full md:w-[240px] lg:w-[320px]">
              {/* Semester Selection Card */}

              <Selection
                title="Semester"
                selectedValue={selectedSemester}
                selectedValue2={selectedStream}
                onValueChange={load_subjects_for_teacher_choice}
                placeholder="Select Semester"
                data={semesters}
                optionTitle={'Semester'}
              />
            </div>}
        </div>

        {!isSubjectLock  && !saveAsDraft && selectedSubjects.length > 0 &&
          <Button onClick={togglePanel} className="mt-3 w-full lg:w-auto">
            <BookOpen className="mr-2 h-4 w-4" />
            Save As Draft
            <span className="ml-2 rounded-full bg-gray-100 px-2 py-1 text-xs font-bold text-gray-900">
              {selectedSubjects.length}
            </span>
          </Button>}

          {!isSubjectLock  && saveAsDraft && 
          <Button className="mt-3 w-full lg:w-auto"
           onClick={handleOnClickForUnsaveDraft}
          >
            <BookOpen className="mr-2 h-4 w-4" />
              Unsave Draft
          </Button>}

        {choice_deadline && subjects && !isSubjectLock &&
          <Alert className="w-full border-yellow-500 bg-yellow-50 dark:border-red-400 dark:bg-red-900">
            <div className="">
              <AlertTitle className="flex items-center space-x-4 text-yellow-800 dark:text-white">
                <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-300" />
                <span>Decision Deadline : {choice_deadline} </span>
              </AlertTitle>
            </div>
          </Alert>
        }
        <div className="w-full p-4">
          {/* Check if subjects is null or loading */}
          {subjects === null ? (
            <div className="flex w-full flex-col items-center gap-4">
              <Skeleton className="sm:h-18 h-20 w-full" />
              <Skeleton className="sm:h-18 h-20 w-full" />
              <Skeleton className="sm:h-18 h-20 w-full" />
              <Skeleton className="sm:h-18 h-20 w-full" />
              <Skeleton className="sm:h-18 h-20 w-full" />
              <Skeleton className="sm:h-18 h-20 w-full" />
              <Skeleton className="sm:h-18 h-20 w-full" />
            </div>
          ) : // If subjects is not null, display them in the grid
            subjects.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {subjects.map((subject, index) => (
                  <SubjectCard
                    key={index}
                    subject={subject}
                    toggleSubjectSelection={toggleSubjectSelection}
                    selectedSubjects={selectedSubjects}
                    isSubjectLock={saveAsDraft}
                    setIsSubjectLock={setSaveAsDraft}
                    draggable={true}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="group w-full">
                <Card>
                  <CardHeader className="pb-2"></CardHeader>
                  <CardContent className="text-center">
                    No Subjects are available for this semester.
                  </CardContent>
                </Card>
              </div>
            )}
        </div>

        <ConfirmSubjectSelection
          isPanelOpen={isPanelOpen}
          setIsPanelOpen={setIsPanelOpen}
          togglePanel={togglePanel}
          selectedSubjects={selectedSubjects}
          handleSubjectSelection={handleSubjectSelection}
          selectedSemester={selectedSemester}
          draggable={true}
          onDrop={onDrop}
          setDraggedIndex={setDraggedIndex}
          save_teacher_subject_choice={save_teacher_subject_choice}
        ></ConfirmSubjectSelection>
      </div>
    </div>
  )
}

export default SubjectChoice
