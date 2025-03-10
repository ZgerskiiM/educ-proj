const lessonState = {
    started: new Set(),
    completed: new Set(),
    inProgress: new Set() // запросы выполняются
  };

  export const LessonStateService = {
    // Проверка, был ли урок начат
    isLessonStarted(lessonId) {
      return lessonState.started.has(lessonId);
    },

    // Отметка урока как начатого
    markLessonAsStarted(lessonId) {
      lessonState.started.add(lessonId);
    },

    // Проверка, был ли урок завершен
    isLessonCompleted(lessonId) {
      return lessonState.completed.has(lessonId);
    },

    // Отметка урока как завершенного
    markLessonAsCompleted(lessonId) {
      lessonState.completed.add(lessonId);
    },

    // Проверка, выполняется ли запрос
    isRequestInProgress(requestKey) {
      return lessonState.inProgress.has(requestKey);
    },

    // Отметка начала запроса
    startRequest(requestKey) {
      lessonState.inProgress.add(requestKey);
    },

    // Отметка завершения запроса
    finishRequest(requestKey) {
      lessonState.inProgress.delete(requestKey);
    },

    // Сброс состояния для урока
    resetLessonState(lessonId) {
      lessonState.started.delete(lessonId);
      lessonState.completed.delete(lessonId);
    },

    // Сброс всех состояний
    resetAllStates() {
      lessonState.started.clear();
      lessonState.completed.clear();
      lessonState.inProgress.clear();
    }
  };
