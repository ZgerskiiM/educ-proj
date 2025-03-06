<template>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Изменение цены курса</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="localPrice"
                  label="Цена (руб.)*"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="localDiscountPrice"
                  label="Цена со скидкой (руб.)"
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" text @click="closeDialog">
            Отмена
          </v-btn>
          <v-btn color="blue-darken-1" text @click="updatePrice">
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>

  <script setup>
  import { ref, watch } from 'vue';

  const props = defineProps({
    modelValue: Boolean,
    course: Object
  });

  const emit = defineEmits(['update:modelValue', 'update']);

  const dialog = ref(props.modelValue);
  const localPrice = ref(props.course?.price || 0);
  const localDiscountPrice = ref(props.course?.discountPrice || null);

  watch(() => props.modelValue, (val) => {
    dialog.value = val;
    if (val && props.course) {
      localPrice.value = props.course.price;
      localDiscountPrice.value = props.course.discountPrice;
    }
  });

  watch(dialog, (val) => {
    emit('update:modelValue', val);
  });

  const closeDialog = () => {
    dialog.value = false;
  };

  const updatePrice = () => {
    if (!localPrice.value) {
      alert('Пожалуйста, укажите цену');
      return;
    }

    emit('update', {
      id: props.course.id,
      price: Number(localPrice.value),
      discountPrice: localDiscountPrice.value ? Number(localDiscountPrice.value) : null
    });

    closeDialog();
  };
  </script>
