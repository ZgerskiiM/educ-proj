<template>
    <v-app>
      <!-- Header admin -->
      <v-app-bar app color="#F48A21" dark>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <div class="logo">
            <v-btn>
            <img src="/public/school_вектор_полный_w.png" class="logo__img" />
            </v-btn>
        </div>
        <v-toolbar-title >Панель администратора</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>

      <!-- Admin sidebar -->
      <v-navigation-drawer v-model="drawer" app>

        <v-list dense nav>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          @click="navigateTo(item.value)"
          :class="{ 'v-list-item--active': currentPage === item.value }"
        >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-light">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- Main content -->
      <v-main>
        <v-container fluid>
          <div v-if="currentPage === 'dashboard'">
            <h1 class="font-weight-medium mb-6">Панель управления</h1>
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <v-card class="mx-auto" color="#C4DB87" dark>
                  <v-card-text>
                    <div class="font-weight-thin">{{ stats.totalCourses }}</div>
                    <div  class="font-weight-thin">Всего курсов</div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-card class="mx-auto" color="#FEE99E" dark>
                  <v-card-text>
                    <div class="font-weight-thin">{{ stats.totalStudents }}</div>
                    <div class="font-weight-thin">Студентов</div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-card class="mx-auto" color="#302E2F" dark>
                  <v-card-text>
                    <div class="font-weight-thin">{{ stats.totalEnrollments }}</div>
                    <div class="font-weight-thin">Всего записей</div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-card class="mx-auto" color="#FED85D" dark>
                  <v-card-text>
                    <div class="font-weight-thin">{{ stats.totalRevenue }} ₽</div>
                    <div class="font-weight-thin">Выручка</div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <v-row class="mt-6">
              <v-col cols="12" md="8">
                <v-card>
                  <v-card-title>Статистика записей за последние 30 дней</v-card-title>
                  <v-card-text>
                    <v-chart class="chart" :option="enrollmentChartOption" />
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" md="4">
                <v-card>
                  <v-card-title class="font-weight-medium">Популярные курсы</v-card-title>
                  <v-card-text>
                    <v-chart class="chart" :option="popularCoursesChartOption" />
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>


          </div>

          <!-- Управление курсами -->
          <div v-if="currentPage === 'courses'">
            <div class="d-flex justify-space-between align-center mb-6">
              <h1 class="font-weight-regular">Управление курсами</h1>
              <v-btn
                color="#333132"
                prepend-icon="mdi-plus"
                @click="newCourseDialog = !newCourseDialog"
              >
                Создать курс
              </v-btn>
            </div>

            <!-- Поиск и фильтры -->
            <v-card class="mb-6">
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="courseSearch"
                      label="Поиск курсов"
                      prepend-inner-icon="mdi-magnify"
                      hide-details
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-select
                      v-model="courseStatus"
                      :items="['Все статусы', 'Опубликован', 'Черновик', 'Архив']"
                      label="Статус"
                      outlined
                      dense
                      hide-details
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-select
                      v-model="courseCategory"
                      :items="['Все категории', 'Вязание', 'Шитье', 'Дизайн']"
                      label="Категория"
                      outlined
                      dense
                      hide-details
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-btn color="#333132" block>
                      Применить
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <!-- Таблица курсов -->
            <v-data-table
              :headers="courseHeaders"
              :items="courses"
              :search="courseSearch"
              :items-per-page="10"
              class="elevation-1"
            >
              <template v-slot:item.image="{ item }">
                <v-avatar rounded size="40">
                  <v-img :src="item.image" alt="Course image"></v-img>
                </v-avatar>
              </template>

              <template v-slot:item.price="{ item }">
                <div v-if="item.discountPrice">
                  <span class="text-decoration-line-through">{{ item.price }} ₽</span>
                  <span class="ml-2 font-weight-bold">{{ item.discountPrice }} ₽</span>
                </div>
                <div v-else>
                  {{ item.price }} ₽
                </div>
              </template>

              <template v-slot:item.status="{ item }">
                <v-chip
                  :color="getStatusColor(item.status)"
                  small
                >
                  {{ item.status }}
                </v-chip>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-btn icon small @click="viewCourseStats(item)" class="mr-2">
                  <v-icon small>mdi-chart-line</v-icon>
                </v-btn>
                <v-btn icon small @click="editCourse(item)" class="mr-2">
                  <v-icon small>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon small @click="openPriceDialog(item)">
                  <v-icon small>mdi-currency-usd</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </div>

          <!-- Управление пользователями -->
          <div v-if="currentPage === 'users'">
            <div class="d-flex justify-space-between align-center mb-6">
              <h1 class="font-weight-regular">Управление пользователями</h1>
              <v-btn
                color="#333132"
                prepend-icon="mdi-account-plus"
                @click="openNewAdminDialog"
              >
                Добавить администратора
              </v-btn>
            </div>

            <!-- Поиск -->
            <v-card class="mb-6">
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="5">
                    <v-text-field
                      v-model="userSearch"
                      label="Поиск пользователей"
                      prepend-inner-icon="mdi-magnify"
                      hide-details
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-select
                      v-model="userRole"
                      :items="['Все роли', 'Администратор', 'Пользователь']"
                      label="Роль"
                      outlined
                      dense
                      hide-details
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-btn color="#333132" block>
                      Применить
                    </v-btn>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-btn
                      color="#333132"
                      block
                      prepend-icon="mdi-gift"
                      @click="openGrantAccessDialog"
                    >
                      Выдать доступ
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <!-- Таблица пользователей -->
            <v-data-table
              :headers="userHeaders"
              :items="users"
              :search="userSearch"
              :items-per-page="10"
              class="elevation-1"
            >
              <template v-slot:item.avatar="{ item }">
                <v-avatar size="40">
                  <v-img :src="item.avatar" alt="User avatar"></v-img>
                </v-avatar>
              </template>

              <template v-slot:item.role="{ item }">
                <v-chip
                  :color="item.role === 'Администратор' ? 'primary' : 'default'"
                  small
                >
                  {{ item.role }}
                </v-chip>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-btn icon small @click="viewUserDetails(item)" class="mr-2">
                  <v-icon small>mdi-eye</v-icon>
                </v-btn>
                <v-btn
                  v-if="item.role === 'Администратор'"
                  icon
                  small
                  color="#333132"
                  @click="removeAdmin(item)"
                >
                  <v-icon small>mdi-close</v-icon>
                </v-btn>
                <v-btn
                  v-else
                  icon
                  small
                  color="#333132"
                  @click="makeAdmin(item)"
                >
                  <v-icon small>mdi-account-check</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </div>

          <div v-if="currentPage === 'reports'">
            <h1 class="font-weight-regular">Отчеты</h1>

            <v-card class="mb-6">
              <v-card-title>Генерация отчетов</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-select
                      v-model="reportType"
                      :items="reportTypes"
                      label="Тип отчета"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-menu
                      ref="dateMenu"
                      v-model="dateMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="reportDateRange"
                          label="Период"
                          prepend-icon="mdi-calendar"
                          readonly
                          outlined
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="reportDates"
                        range
                        @input="dateMenu = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-select
                      v-model="reportFormat"
                      :items="['PDF', 'Excel', 'CSV']"
                      label="Формат"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-btn color="#333132" block height="56">
                      Сформировать
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <!-- Список доступных отчетов -->
            <v-card>
              <v-card-title>История отчетов</v-card-title>
              <v-data-table
                :headers="reportHeaders"
                :items="reports"
                :items-per-page="5"
                class="elevation-0"
              >
                <template v-slot:item.actions="{ item }">
                  <v-btn small text color="#333132" class="mr-2">
                    <v-icon small left>mdi-download</v-icon>
                    Скачать
                  </v-btn>
                  <v-btn small text color="#333132">
                    <v-icon small left>mdi-eye</v-icon>
                    Просмотр
                  </v-btn>
                </template>
              </v-data-table>
            </v-card>
          </div>

          <!-- Редактирование курса -->
          <div v-if="currentPage === 'editCourse'">
            <div class="d-flex align-center mb-6">
              <v-btn
                color="#333132"
                icon
                @click="currentPage = 'courses'"
                class="mr-3"
              >
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              <h1 class="text-h4">Редактирование курса: {{ editingCourse.title }}</h1>
            </div>

            <v-tabs v-model="courseTab" background-color="transparent" grow>
              <v-tab>Основная информация</v-tab>
              <v-tab>Уроки</v-tab>
              <v-tab>Настройки</v-tab>
            </v-tabs>

            <v-tabs-items v-model="courseTab">
              <!-- Основная информация -->
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <v-form ref="courseForm">
                      <v-row>
                        <v-col cols="12" md="8">
                          <v-text-field
                            v-model="editingCourse.title"
                            label="Название курса"
                            required
                            outlined
                          ></v-text-field>

                          <v-textarea
                            v-model="editingCourse.description"
                            label="Описание курса"
                            rows="5"
                            counter
                            outlined
                          ></v-textarea>

                          <v-row>
                            <v-col cols="12" md="6">
                              <v-select
                                v-model="editingCourse.category"
                                :items="['Вязание', 'Шитье', 'Дизайн']"
                                label="Категория"
                                outlined
                              ></v-select>
                            </v-col>
                            <v-col cols="12" md="6">
                              <v-select
                                v-model="editingCourse.level"
                                :items="['Начинающий', 'Средний', 'Продвинутый']"
                                label="Уровень"
                                outlined
                              ></v-select>
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="12" md="6">
                              <v-text-field
                                v-model="editingCourse.duration"
                                label="Продолжительность (часы)"
                                type="number"
                                outlined
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                              <v-select
                                v-model="editingCourse.status"
                                :items="['Опубликован', 'Черновик', 'Архив']"
                                label="Статус"
                                outlined
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-col>

                        <v-col cols="12" md="4">
                          <div class="text-center">
                            <v-img
                              :src="editingCourse.image || 'https://via.placeholder.com/400x300?text=Выберите+изображение'"
                              max-height="250"
                              contain
                              class="grey lighten-2 mb-4 rounded"
                            ></v-img>
                            <v-file-input
                              label="Изображение курса"
                              accept="image/*"
                              prepend-icon=""
                              outlined
                              dense
                            ></v-file-input>
                          </div>

                          <v-divider class="my-4"></v-divider>

                          <div>
                            <h3 class="text-subtitle-1 mb-3">Цена</h3>
                            <v-text-field
                              v-model="editingCourse.price"
                              label="Стандартная цена"
                              type="number"
                              prefix="₽"
                              outlined
                              dense
                            ></v-text-field>

                            <v-checkbox
                              v-model="editingCourse.hasDiscount"
                              label="Применить скидку"
                            ></v-checkbox>

                            <v-text-field
                              v-if="editingCourse.hasDiscount"
                              v-model="editingCourse.discountPrice"
                              label="Цена со скидкой"
                              type="number"
                              prefix="₽"
                              outlined
                              dense
                            ></v-text-field>
                          </div>
                        </v-col>
                      </v-row>

                      <div class="d-flex justify-end">
                        <v-btn color="#333132" large class="mr-4">
                          Сохранить
                        </v-btn>
                        <v-btn color="#333132" text @click="currentPage = 'courses'">
                          Отмена
                        </v-btn>
                      </div>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <!-- Уроки -->
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <div class="d-flex justify-space-between mb-4">
                      <h2 class="text-h5">Уроки курса</h2>
                      <v-btn color="#333132"  prepend-icon="mdi-plus" @click="addNewLesson">
                        Добавить урок
                      </v-btn>
                    </div>

                    <v-expansion-panels>
                      <v-expansion-panel
                        v-for="(lesson, index) in editingCourse.lessons"
                        :key="index"
                      >
                        <v-expansion-panel-header>
                          <div class="d-flex align-center">
                            <div class="mr-3">{{ index + 1 }}.</div>
                            <div>{{ lesson.title }}</div>
                          </div>
                          <template v-slot:actions>
                            <v-icon color="primary">$expand</v-icon>
                          </template>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <v-form>
                            <v-text-field
                              v-model="lesson.title"
                              label="Название урока"
                              outlined
                              class="mb-4"
                            ></v-text-field>

                            <v-textarea
                              v-model="lesson.description"
                              label="Описание урока"
                              outlined
                              rows="3"
                              class="mb-4"
                            ></v-textarea>

                            <v-row>
                              <v-col cols="12" md="6">
                                <v-text-field
                                  v-model="lesson.duration"
                                  label="Длительность (минуты)"
                                  type="number"
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="6">
                                <v-file-input
                                  label="Видео урока"
                                  accept="video/*"
                                  outlined
                                  prepend-icon="mdi-video"
                                ></v-file-input>
                              </v-col>
                            </v-row>

                            <div class="d-flex justify-end">
                              <v-btn
                                text
                                color="#333132"
                                @click="removeLesson(index)"
                                class="mr-4"
                                prepend-icon="mdi-trash-can"
                              >
                                Удалить
                              </v-btn>
                              <v-btn
                                prepend-icon="mdi-content-save" color="#333132"
                              >
                                Сохранить
                              </v-btn>
                            </div>
                          </v-form>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>

                    <div v-if="editingCourse.lessons.length === 0" class="text-center pa-6 grey--text">
                      <v-icon x-large color="grey lighten-1">mdi-playlist-remove</v-icon>
                      <div class="mt-3">У курса пока нет уроков. Добавьте первый урок.</div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <!-- Настройки -->
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <h2 class="text-h5 mb-4">Настройки курса</h2>

                    <v-row>
                      <v-col cols="12" md="6">
                        <v-switch
                          v-model="editingCourse.settings.certificateEnabled"
                          label="Выдавать сертификат по окончании"
                          color="primary"
                        ></v-switch>

                        <v-switch
                          v-model="editingCourse.settings.commentsEnabled"
                          label="Разрешить комментарии"
                          color="primary"
                        ></v-switch>

                        <v-switch
                          v-model="editingCourse.settings.previewEnabled"
                          label="Разрешить бесплатный предпросмотр"
                          color="primary"
                        ></v-switch>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="editingCourse.settings.completionThreshold"
                          label="Порог завершения курса (%)"
                          type="number"
                          min="1"
                          max="100"
                          outlined
                        ></v-text-field>

                        <v-select
                          v-model="editingCourse.settings.accessDuration"
                          :items="['Безлимитный', '1 месяц', '3 месяца', '6 месяцев', '1 год']"
                          label="Длительность доступа"
                          outlined
                        ></v-select>
                      </v-col>
                    </v-row>

                    <v-divider class="my-6"></v-divider>

                    <h3 class="text-subtitle-1 mb-4">Дополнительные настройки отображения</h3>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="editingCourse.settings.metaTitle"
                          label="Meta Title"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="editingCourse.settings.metaKeywords"
                          label="Meta Keywords"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          v-model="editingCourse.settings.metaDescription"
                          label="Meta Description"
                          rows="3"
                          outlined
                        ></v-textarea>
                      </v-col>
                    </v-row>

                    <div class="d-flex justify-end mt-4">
                      <v-btn large>
                        Сохранить настройки
                      </v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </div>

          <!-- Статистика курса -->
          <div v-if="currentPage === 'courseStats'">
            <div class="d-flex align-center mb-6">
              <v-btn color="#333132" icon @click="currentPage = 'courses'" class="mr-3">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              <h1 class="">Статистика курса: {{ currentCourseStats.title }}</h1>
            </div>

            <v-row>
              <v-col cols="12" md="3">
                <v-card class="mx-auto" color="primary" dark>
                  <v-card-text>
                    <div class="text-h4 font-weight-thin">{{ currentCourseStats.totalStudents }}</div>
                    <div>Студентов</div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" md="3">
                <v-card class="mx-auto" color="success" dark>
                  <v-card-text>
                    <div class="text-h4 font-weight-thin">{{ currentCourseStats.completionRate }}%</div>
                    <div>Процент завершения</div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" md="3">
                <v-card class="mx-auto" color="info" dark>
                  <v-card-text>
                    <div class="text-h4 font-weight-thin">{{ currentCourseStats.averageRating }}/5</div>
                    <div>Средний рейтинг</div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" md="3">
                <v-card class="mx-auto" color="warning" dark>
                  <v-card-text>
                    <div class="text-h4 font-weight-thin">{{ currentCourseStats.revenue }} ₽</div>
                    <div>Выручка</div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <v-row class="mt-6">
              <v-col cols="12" md="7">
                <v-card>
                  <v-card-title>Динамика регистраций</v-card-title>
                  <v-card-text>
                    <v-chart class="chart" :option="courseEnrollmentOption" />
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" md="5">
                <v-card>
                  <v-card-title>Завершаемость уроков</v-card-title>
                  <v-card-text>
                    <v-chart class="chart" :option="lessonCompletionOption" />
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <v-card class="mt-6">
              <v-card-title>Студенты курса</v-card-title>
              <v-data-table
                :headers="studentsHeaders"
                :items="currentCourseStats.students"
                :items-per-page="10"
                class="elevation-0"
              >
                <template v-slot:item.avatar="{ item }">
                  <v-avatar size="40">
                    <v-img :src="item.avatar" alt="User avatar"></v-img>
                  </v-avatar>
                </template>

                <template v-slot:item.progress="{ item }">
                  <v-progress-linear
                    :value="item.progress"
                    height="10"
                    :color="getProgressColor(item.progress)"
                    rounded
                  >
                    <template v-slot:default>
                      <span class="text-caption white--text">{{ item.progress }}%</span>
                    </template>
                  </v-progress-linear>
                </template>

                <template v-slot:item.status="{ item }">
                  <v-chip
                    :color="getStudentStatusColor(item.status)"
                    x-small
                  >
                    {{ item.status }}
                  </v-chip>
                </template>

                <template v-slot:item.actions="{ item }">
                  <v-btn x-small text  class="mr-2">
                    <v-icon x-small left>mdi-eye</v-icon>
                    Детали
                  </v-btn>
                  <v-btn x-small text >
                    <v-icon x-small left>mdi-trash-can</v-icon>
                    Удалить
                  </v-btn>
                </template>
              </v-data-table>
            </v-card>
          </div>
        </v-container>
      </v-main>

      <!-- Диалоги -->

      <!-- Диалог изменения цены -->
      <v-dialog v-model="priceDialog" max-width="500">
        <v-card>
          <v-card-title>Изменение цены курса</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="editingPrice.originalPrice"
                label="Стандартная цена"
                type="number"
                prefix="₽"
                outlined
                class="mb-4"
              ></v-text-field>

              <v-checkbox
                v-model="editingPrice.hasDiscount"
                label="Применить скидку"
              ></v-checkbox>

              <v-text-field
                v-if="editingPrice.hasDiscount"
                v-model="editingPrice.discountPrice"
                label="Цена со скидкой"
                type="number"
                prefix="₽"
                outlined
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="priceDialog = false">Отмена</v-btn>
            <v-btn  @click="savePrice">Сохранить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Диалог добавления админа -->
      <v-dialog v-model="adminDialog" max-width="500">
        <v-card>
          <v-card-title>Добавление администратора</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="newAdmin.email"
                label="Email пользователя"
                type="email"
                outlined
                class="mb-4"
              ></v-text-field>

              <v-select
                v-model="newAdmin.role"
                :items="['Администратор', 'Модератор']"
                label="Роль"
                outlined
                class="mb-4"
              ></v-select>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="adminDialog = false">Отмена</v-btn>
            <v-btn  @click="addAdmin">Добавить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Диалог выдачи доступа к курсу -->
      <v-dialog v-model="grantAccessDialog" max-width="600">
        <v-card>
          <v-card-title>Выдача доступа к курсу</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="grantAccess.email"
                label="Email пользователя"
                type="email"
                outlined
                class="mb-4"
              ></v-text-field>

              <v-autocomplete
                v-model="grantAccess.courseId"
                :items="courses"
                item-text="title"
                item-value="id"
                label="Выберите курс"
                outlined
                class="mb-4"
              ></v-autocomplete>

              <v-select
                v-model="grantAccess.duration"
                :items="['Безлимитно', '1 месяц', '3 месяца', '6 месяцев', '1 год']"
                label="Длительность доступа"
                outlined
                class="mb-4"
              ></v-select>

              <v-textarea
                v-model="grantAccess.comment"
                label="Комментарий (опционально)"
                outlined
                rows="3"
              ></v-textarea>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="grantAccessDialog = false">Отмена</v-btn>
            <v-btn  @click="grantCourseAccess">Предоставить доступ</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Диалог создания нового курса -->
      <v-dialog v-model="newCourseDialog" max-width="800">
        <v-card>
          <v-card-title>Создание нового курса</v-card-title>
          <v-card-text>
            <v-form ref="newCourseForm">
              <v-text-field
                v-model="newCourse.title"
                label="Название курса"
                required
                outlined
                class="mb-4"
              ></v-text-field>

              <!-- <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="newCourse.level"
                    :items="['Начинающий', 'Средний', 'Продвинутый']"
                    label="Уровень"
                    outlined
                    class="mb-4"
                  ></v-select>
                </v-col>
              </v-row> -->

              <!-- <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="newCourse.price"
                    label="Цена"
                    type="number"
                    prefix="₽"
                    outlined
                    class="mb-4"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="newCourse.status"
                    :items="['Опубликован', 'Черновик']"
                    label="Статус"
                    outlined
                    class="mb-4"
                  ></v-select>
                </v-col>
              </v-row> -->

              <v-file-input
                label="Изображение курса"
                accept="image/*"
                outlined
                class="mb-4"
              ></v-file-input>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="newCourseDialog = false">Отмена</v-btn>
            <v-btn  @click="addNewCourse">Создать курс</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
  </template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';

// Реактивные переменные
const drawer = ref(true);
const currentPage = ref('dashboard'); // Начальная страница - дашборд
const courseTab = ref(null);

// Диалоги
const priceDialog = ref(false);
const adminDialog = ref(false);
const grantAccessDialog = ref(false);
const newCourseDialog = ref(false);
const dateMenu = ref(false);

// Поисковые запросы
const courseSearch = ref('');
const userSearch = ref('');

// Фильтры
const courseStatus = ref('Все статусы');
const courseCategory = ref('Все категории');
const userRole = ref('Все роли');

// Добавим состояние для обработки загрузок и ошибок
const loading = ref(false);
const error = ref(null);
const successMessage = ref('');

// Функция для отображения уведомлений (реализация зависит от вашей UI библиотеки)
const showNotification = (message, type = 'success') => {
  // Здесь можно использовать Vuetify snackbar или другую систему уведомлений
  successMessage.value = message;
  // Сбросить сообщение через 3 секунды
  setTimeout(() => {
    successMessage.value = '';
  }, 3000);
};

// Пункты меню
const menuItems = reactive([
  { title: 'Дашборд', icon: 'mdi-view-dashboard', value: 'dashboard' },
  { title: 'Курсы', icon: 'mdi-book-open-page-variant', value: 'courses' },
  { title: 'Пользователи', icon: 'mdi-account-group', value: 'users' },
  { title: 'Отчеты', icon: 'mdi-file-chart', value: 'reports' },
  { title: 'Настройки', icon: 'mdi-cog', value: 'settings' }
]);

// Данные статистики
const stats = reactive({
  totalCourses: 15,
  totalStudents: 432,
  totalEnrollments: 687,
  totalRevenue: 576800
});

// Заголовки таблиц
const courseHeaders = reactive([
  { text: 'Изображение', value: 'image', sortable: false },
  { text: 'Название', value: 'title' },
  { text: 'Категория', value: 'category' },
  { text: 'Цена', value: 'price' },
  { text: 'Студенты', value: 'students' },
  { text: 'Статус', value: 'status' },
  { text: 'Действия', value: 'actions', sortable: false }
]);

const userHeaders = reactive([
  { text: 'Фото', value: 'avatar', sortable: false },
  { text: 'Имя', value: 'name' },
  { text: 'Email', value: 'email' },
  { text: 'Регистрация', value: 'registered' },
  { text: 'Роль', value: 'role' },
  { text: 'Курсы', value: 'courses' },
  { text: 'Действия', value: 'actions', sortable: false }
]);

const studentsHeaders = reactive([
  { text: 'Фото', value: 'avatar', sortable: false },
  { text: 'Имя', value: 'name' },
  { text: 'Email', value: 'email' },
  { text: 'Прогресс', value: 'progress' },
  { text: 'Последняя активность', value: 'lastActivity' },
  { text: 'Статус', value: 'status' },
  { text: 'Действия', value: 'actions', sortable: false }
]);

const reportHeaders = reactive([
  { text: 'Название', value: 'name' },
  { text: 'Тип', value: 'type' },
  { text: 'Дата создания', value: 'date' },
  { text: 'Формат', value: 'format' },
  { text: 'Размер', value: 'size' },
  { text: 'Действия', value: 'actions', sortable: false }
]);

// Данные для отчетов
const reportType = ref('Продажи за период');
const reportTypes = reactive([
  'Продажи за период',
  'Активность пользователей',
  'Прогресс студентов',
  'Доходы по курсам',
  'Административный отчет'
]);
const reportDates = reactive([]);
const reportDateRange = ref('');
const reportFormat = ref('PDF');

// Данные для редактирования
const editingCourse = reactive({
  id: null,
  title: '',
  description: '',
  image: '',
  category: '',
  level: '',
  duration: '',
  price: '',
  discountPrice: '',
  hasDiscount: false,
  status: '',
  lessons: [],
  settings: {
    certificateEnabled: true,
    commentsEnabled: true,
    previewEnabled: false,
    completionThreshold: 80,
    accessDuration: 'Безлимитный',
    metaTitle: '',
    metaKeywords: '',
    metaDescription: ''
  }
});

// Данные для статистики курса
const currentCourseStats = reactive({
  id: null,
  title: '',
  totalStudents: 0,
  completionRate: 0,
  averageRating: 0,
  revenue: 0,
  students: []
});

// Данные для диалогов
const editingPrice = reactive({
  courseId: null,
  originalPrice: '',
  discountPrice: '',
  hasDiscount: false
});

const newAdmin = reactive({
  email: '',
  role: 'Администратор'
});

const grantAccess = reactive({
  email: '',
  courseId: null,
  duration: 'Безлимитно',
  comment: ''
});

const newCourse = reactive({
  title: '',
  description: '',
  category: '',
  level: 'Начинающий',
  price: '',
  status: 'Черновик'
});

// Данные для таблиц
const courses = reactive([
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1566055909643-a51b4271d2bf',
    title: 'Основы работы с бриошью',
    price: 5900,
    discountPrice: 4500,
    students: 87,
    status: 'Опубликован'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1584992236310-6ededf93ba42',
    title: 'Продвинутые техники вязания',
    price: 7800,
    discountPrice: null,
    students: 63,
    status: 'Опубликован'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1601379327928-bedfaf9da2d0',
    title: 'Создание авторских узоров',
    price: 8500,
    discountPrice: null,
    students: 45,
    status: 'Опубликован'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1604940500679-f6b1f972d992',
    title: 'Начальный курс по шитью',
    price: 4900,
    discountPrice: 3900,
    students: 112,
    status: 'Опубликован'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1620799461091-26e216627d14',
    title: 'Шитье: мастер-класс по пошиву юбки',
    price: 3500,
    discountPrice: null,
    students: 74,
    status: 'Черновик'
  }
]);

const users = reactive([
  {
    id: 1,
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    name: 'Екатерина Смирнова',
    email: 'kate@example.com',
    registered: '15.10.2024',
    role: 'Администратор',
    courses: 5
  },
  {
    id: 2,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Иван Петров',
    email: 'ivan@example.com',
    registered: '23.09.2024',
    role: 'Администратор',
    courses: 3
  },
  {
    id: 3,
    avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    name: 'Анна Иванова',
    email: 'anna@example.com',
    registered: '05.08.2024',
    role: 'Пользователь',
    courses: 4
  },
  {
    id: 4,
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    name: 'Алексей Сидоров',
    email: 'alex@example.com',
    registered: '12.07.2024',
    role: 'Пользователь',
    courses: 2
  },
  {
    id: 5,
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    name: 'Мария Кузнецова',
    email: 'maria@example.com',
    registered: '30.06.2024',
    role: 'Пользователь',
    courses: 1
  }
]);

const reports = reactive([
  {
    id: 1,
    name: 'Продажи за февраль 2025',
    type: 'Продажи за период',
    date: '01.03.2025',
    format: 'PDF',
    size: '1.2 MB'
  },
  {
    id: 5,
    name: 'Административный отчет за январь 2025',
    type: 'Административный отчет',
    date: '01.02.2025',
    format: 'PDF',
    size: '4.3 MB'
  }
]);

const recentActivities = reactive([
  {
    title: 'Новая регистрация',
    description: 'Пользователь Марина Соколова зарегистрировался на платформе',
    time: '10 минут назад',
    icon: 'mdi-account-plus',
    color: 'primary'
  },
  {
    title: 'Новая покупка',
    description: 'Пользователь Иван Петров приобрел курс "Основы работы с бриошью"',
    time: '35 минут назад',
    icon: 'mdi-cart',
    color: 'success'
  },
  {
    title: 'Завершение курса',
    description: 'Пользователь Анна Иванова завершила курс "Продвинутые техники вязания"',
    time: '2 часа назад',
    icon: 'mdi-certificate',
    color: 'info'
  },
  {
    title: 'Новый отзыв',
    description: 'Пользователь Алексей Сидоров оставил отзыв на курс "Создание авторских узоров"',
    time: '3 часа назад',
    icon: 'mdi-star',
    color: 'warning'
  }
]);

// Данные для графиков
const enrollmentChartOption = reactive({
  // Здесь данные для графика записей
  // В реальном приложении эти данные будут приходить с бэкенда
});

const popularCoursesChartOption = reactive({
  // Здесь данные для графика популярных курсов
});

const courseEnrollmentOption = reactive({
  // Здесь данные для графика записей на конкретный курс
});

const lessonCompletionOption = reactive({
  // Здесь данные для графика завершаемости уроков
});

// Функция для навигации между страницами
const navigateTo = (page) => {
  currentPage.value = page;
};

// Функции для статусов
const getStatusColor = (status) => {
  switch (status) {
    case 'Опубликован': return 'success';
    case 'Черновик': return 'warning';
    case 'Архив': return 'grey';
    default: return 'default';
  }
};

const getProgressColor = (progress) => {
  if (progress < 30) return 'error';
  if (progress < 70) return 'warning';
  if (progress < 100) return 'info';
  return 'success';
};

const getStudentStatusColor = (status) => {
  switch (status) {
    case 'Активен': return 'success';
    case 'Завершил': return 'info';
    case 'Неактивен': return 'grey';
    default: return 'default';
  }
};

const API_URL = 'http://localhost:8080';

// Метод для редактирования курса
const editCourse = (course) => {
  // Логика редактирования курса
};

// Метод для удаления курса
const deleteCourse = (course) => {
  // Логика удаления курса
};

// Добавление нового курса
const addNewCourse = async () => {
  // Проверка на заполнение обязательных полей
  if (!newCourse.title) {
    error.value = 'Пожалуйста, укажите название курса';
    showNotification(error.value, 'error');
    return;
  }

  loading.value = true;
  error.value = null;

  try {
    const courseData = {
      title: newCourse.title,
      imageUrl: newCourse.image || '' // Предполагаем, что в newCourse может быть поле image
    };

    const token = localStorage.getItem("jwt_token");
    const formData = new FormData();
    formData.append('title', newCourse.title);
    formData.append('imageUrl', newCourse.image || '');

    const response = await axios.post(`${API_URL}/admin/courses`, formData, {
    headers: {
        Authorization: `Bearer ${token}`
    }
    });

    const createdCourseId = response.data.id;

    const formData1 = new FormData();
    formData1.append('title', newCourse.title);
    formData1.append('courseId', createdCourseId);
    formData1.append('imageUrl', newCourse.image || '');

    await axios.post(`${API_URL}/admin/blocks`, formData1, {
    headers: {
        Authorization: `Bearer ${token}`
    }
    });

    // Добавляем новый курс в локальный массив
    courses.push({
      id: createdCourseId,
      title: newCourse.title,
      image: newCourse.image || '',
    //   category: newCourse.category || 'Без категории',
    //   price: newCourse.price || 0,
    //   discountPrice: null,
    //   students: 0,
    //   status: 'Черновик'
    });

    // Сбрасываем форму
    newCourse.title = '';
    newCourse.description = '';
    newCourse.category = '';
    newCourse.level = 'Начинающий';
    newCourse.price = '';
    newCourse.status = 'Черновик';

    // Закрываем диалог создания нового курса
    newCourseDialog.value = false;

    showNotification('Новый курс успешно создан');

    // Перенаправляем на редактирование созданного курса
    editCourse({ id: createdCourseId, title: courseData.title });

  } catch (err) {
    console.error('Ошибка при создании курса:', err);
    error.value = err.response?.data?.message || 'Произошла ошибка при создании курса';
    showNotification(error.value, 'error');
  } finally {
    loading.value = false;
  }
};

// Редактирование цены
const editCoursePrice = (course) => {
  editingPrice.courseId = course.id;
  editingPrice.originalPrice = course.price;
  editingPrice.discountPrice = course.discountPrice;
  editingPrice.hasDiscount = !!course.discountPrice;
  priceDialog.value = true;
};

// Предоставление доступа к курсу
const grantCourseAccess = (course) => {
  grantAccess.courseId = course.id;
  grantAccessDialog.value = true;
};

// Загрузка начальных данных
const fetchInitialData = () => {
  // Здесь может быть запрос к API
  // В демо-версии используем уже имеющиеся данные
};

// При монтировании компонента
onMounted(() => {
  fetchInitialData();
});
</script>

  <style scoped>
  .chart {
    width: 100%;
    height: 350px;
  }

  .v-btn {
  font-weight: 200;
  font-size: 0.8rem;
}

  .logo__img {
    height: 4vh;
  }

  @media (max-width: 600px) {
    .chart {
      height: 250px;
    }
  }
  </style>
