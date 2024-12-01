import { useEffect } from 'react'


import useDivisionCreation from '../hooks/useDivisionCreation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { GripVertical } from 'lucide-react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import Selection from '@components/common/form/selectiom/Selection'
import useStream from '@components/common/uploadTimeTable/useStream'
import StudentListForDivision from './StudentListForDivision'
import DivisionCreationSuggesition from './DivisionCreationSuggesition'

const DivisionCreation = () => {
  const { stream, handleStream } = useStream()

  const {
    semesters,
    divisions,
    selectedStream,
    selectedSemester,
    isOpenSuggesition,
    setCapacityDivision,
    sujectChoiceGroup,
    maxDivisionCapacity,
    divisionsData,
    activeTab,
    renderStudentList,
    divisionsAlreadyCreated,
    setActiveTab,
    handleOnValueChangeOfStream,
    handleOnValueChangeOfSemester,
    setIsOpenSuggesition,
    handleOnClickForAcceptSuggestion,
    handleOnClickForDeclineSuggestion,
    handleOnClickForDisplaySuggestion,
    setMaxDivisionCapacity,
    handelOnClickForSaveDivisions,
    onDragEnd,
    updateAvailableCounts,
    studentBatchList
  } = useDivisionCreation()

  useEffect(() => {
    handleStream()
  }, [])

  useEffect(() => {
    updateAvailableCounts()
  }, [divisions])

  return (
    <div className="mx-auto p-4">
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-col items-center justify-center space-y-4 md:w-auto md:flex-row md:items-start md:space-x-8 md:space-y-0 lg:space-x-12">
          {stream && (
            <div className="relative w-full md:w-[240px] lg:w-[320px]">
              <Selection
                title="Stream"
                selectedValue={selectedStream}
                selectedValue2=" "
                onValueChange={handleOnValueChangeOfStream}
                placeholder="Select Stream"
                data={stream}
                optionTitle={null}
              />

              <div className="absolute right-[-2rem] top-1/2 hidden h-[3px] w-8 bg-gray-400 md:block lg:right-[-3rem] lg:w-12" />
              <div className="absolute bottom-[-1em] left-1/2 h-4 w-[3px] -translate-x-1/2 transform bg-gray-400 md:hidden" />
            </div>
          )}
          <div className="relative w-full md:w-[240px] lg:w-[320px]">
            <Selection
              title="Semester"
              selectedValue={selectedSemester}
              selectedValue2={selectedStream}
              onValueChange={handleOnValueChangeOfSemester}
              placeholder="Select Semester"
              data={semesters}
              optionTitle={'Semester'}
            />
          </div>
        </div>

        {renderStudentList && !divisionsAlreadyCreated && (
          <div className='flex w-full flex-x-4'>
          <Button
            className="mt-4"
            variant={'destructive'}
            onClick={() => handelOnClickForSaveDivisions()}
          >
            Change division size 
          </Button>
          <Button
            className="mt-4"
            variant={'default'}
            onClick={() => handelOnClickForSaveDivisions()}
          >
            Confirm Divisions
          </Button>
          </div>
        )}
        {selectedSemester && !divisionsAlreadyCreated && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex flex-col gap-4">
              {!renderStudentList && (
                <div>
                  <h2 className="mb-2 text-xl font-semibold">
                    Subject Choice Groups
                  </h2>
                  <Droppable droppableId="groups">
                    {(provided) => (
                      <ul
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-2"
                      >
                        {sujectChoiceGroup
                          .filter((group) => group.availableCount > 0)
                          .map((group, index) => (
                            <Draggable
                              key={group.slug}
                              draggableId={group.slug}
                              index={index}
                            >
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="flex items-center justify-between rounded p-2 shadow dark:bg-black"
                                >
                                  <div className="flex items-center">
                                    <GripVertical className="mr-2" />
                                    <span>{group.subjects}</span>
                                  </div>
                                  <span className="font-semibold">
                                    {group.totalCount}
                                  </span>
                                </li>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </div>
              )}

              {/* {!isSuggesitionAccept && <div>
                                <h2 className="text-xl font-semibold mb-2">Divisions</h2>
                                {divisions.length === 0 ? (
                                    <Button onClick={createDivisions} className="w-full">Create Divisions</Button>
                                ) : (
                                    <div className="space-y-4">
                                        {divisions.map((division) => (
                                            <Droppable key={division.id} droppableId={division.id}>
                                                {(provided) => (
                                                    <Card>
                                                        <CardHeader>
                                                            <CardTitle>Division {division.id.split('-')[1]}</CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2 min-h-[50px]">
                                                                {division.groups.map((group) => {
                                                                    const groupDetails = sujectChoiceGroup.find(g => g.slug === group.groupId)
                                                                    return (
                                                                        <li key={group.groupId} className="flex items-center justify-between dark:bg-black p-2 rounded">
                                                                            <span>{groupDetails?.subjects}</span>
                                                                            <div className="flex items-center space-x-2">
                                                                                <Input
                                                                                    type="number"
                                                                                    value={group.count}
                                                                                    onChange={(e) => updateGroupCount(division.id, group.groupId, parseInt(e.target.value) || 0)}
                                                                                    className="w-20"
                                                                                    min="0"
                                                                                    max={groupDetails?.totalCount}
                                                                                />
                                                                                <Button
                                                                                    variant="destructive"
                                                                                    size="icon"
                                                                                    onClick={() => removeGroupFromDivision(division.id, group.groupId)}
                                                                                >
                                                                                    <Minus className="h-4 w-4" />
                                                                                </Button>
                                                                            </div>
                                                                        </li>
                                                                    )
                                                                })}
                                                                {provided.placeholder}
                                                            </ul>
                                                        </CardContent>
                                                    </Card>
                                                )}
                                            </Droppable>
                                        ))}
                                    </div>
                                )}
                            </div>} */}
            </div>
          </DragDropContext>
        )}

        {selectedSemester && !divisionsAlreadyCreated && (
          <div ref={setCapacityDivision}>
            <Card>
              <CardHeader>
                <CardTitle>
                  <h2 className="text-xl font-semibold">
                    Set Division Capacity Range
                  </h2>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="w-full">
                  <div className="mb-3 flex w-full flex-col justify-center gap-3 lg:flex-row lg:space-x-4">
                    <div className={`w-full`}>
                      <span className="dark:text-white">
                        Maximum Division Count
                      </span>
                      <Input
                        id="maxCount"
                        type="number"
                        value={maxDivisionCapacity}
                        onChange={(e) => {
                          setMaxDivisionCapacity(e.target.value)
                        }}
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    className="w-full"
                    onClick={() => {
                      handleOnClickForDisplaySuggestion()
                    }}
                  >
                    Set Division Capacity
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {divisionsData && renderStudentList && (
          <StudentListForDivision
            divisionsData={divisionsData}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handelOnClickForSaveDivisions={handelOnClickForSaveDivisions}
            studentBatchList={studentBatchList}
          ></StudentListForDivision>
        )}
      </div>

      {divisionsData && (
        <DivisionCreationSuggesition
          isOpenSuggesition={isOpenSuggesition}
          setIsOpenSuggesition={setIsOpenSuggesition}
          handleOnClickForAcceptSuggestion={handleOnClickForAcceptSuggestion}
          handleOnClickForDeclineSuggestion={handleOnClickForDeclineSuggestion}
          divisionsData={divisionsData}
        ></DivisionCreationSuggesition>
      )}
    </div>
  )
}

export default DivisionCreation
