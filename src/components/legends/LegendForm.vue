<template>
    <div class="card flex justify-center">
        <Form :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-80">
            <FormField v-slot="$field" name="name" initialValue="" :resolver="zodLegendNameResolver"
                class="flex flex-col gap-1">
                <InputText type="text" placeholder="Legend Name" />
                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                    {{ $field.error?.message }}</Message>
            </FormField>
            <FormField v-slot="$field" name="category" initialValue="" :resolver="zodCategoryNameResolver"
                class="flex flex-col gap-1">
                <InputText type="text" placeholder="Category Name" />
                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                    {{ $field.error?.message }}</Message>
            </FormField>
            <FormField v-slot="$field" name="description" class="flex flex-col gap-1">
                <Textarea placeholder="Legend Description " />
                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                    {{ $field.error?.message }}</Message>
            </FormField>
            <FormField v-slot="$field" name="province" initialValue="" :resolver="zodProvinceResolver"
                class="flex flex-col gap-1">
                <InputText type="text" placeholder="Province" />
                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                    {{ $field.error?.message }}</Message>
            </FormField>
            <FormField v-slot="$field" name="canton" initialValue="" :resolver="zodCantonResolver"
                class="flex flex-col gap-1">
                <InputText type="text" placeholder="Canton" />
                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                    {{ $field.error?.message }}</Message>
            </FormField>
            <FormField v-slot="$field" name="district" initialValue="" :resolver="zodDistrictResolver"
                class="flex flex-col gap-1">
                <InputText type="text" placeholder="District" />
                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                    {{ $field.error?.message }}</Message>
            </FormField>
            <FormField v-slot="$field" name="district" initialValue="" :resolver="zodDistrictResolver"
                class="flex flex-col gap-1">
                <FileUpload mode="basic" @select="onFileSelect" customUpload auto severity="secondary"
                    class="p-button-outlined" />
                <img v-if="src" :src="src" alt="Image" class="shadow-md rounded-xl w-full sm:w-64"
                    style="filter: grayscale(100%)" />
                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                    {{ $field.error?.message }}</Message>
            </FormField>
            <Button type="submit" severity="secondary" label="Submit" />
        </Form>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { valibotResolver } from '@primevue/forms/resolvers/valibot';
import { yupResolver } from '@primevue/forms/resolvers/yup';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import * as v from 'valibot';
import * as yup from 'yup';
import { z } from 'zod';
import { useToast } from 'primevue/usetoast';
import FileUpload from 'primevue/fileupload';


const src = ref(null);

const toast = useToast();

const initialValues = reactive({
    details: ''
});

const resolver = zodResolver(
    z.object({
        details: z.string().min(1, { message: 'Details is required via Form Resolver.' })
    })
);

const zodLegendNameResolver = zodResolver(z.string().min(1, { message: 'Legend name is required.' }));
const zodCategoryNameResolver = zodResolver(z.string().min(1, { message: 'Category name is required.' }));
const zodProvinceResolver = zodResolver(z.string().min(1, { message: 'Province is required.' }));
const zodCantonResolver = zodResolver(z.string().min(1, { message: 'Canton is required.' }));
const zodDistrictResolver = zodResolver(z.string().min(1, { message: 'District is required.' }));
// const yupCategoryNameResolver = yupResolver(yup.string().required('Category name is required.'));
// const valibotLastNameResolver = valibotResolver(v.pipe(v.string(), v.minLength(1, 'Last name is required via Valibot.')));

const onFormSubmit = ({ valid }) => {
    if (valid) {
        toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
    }
};


const onFileSelect = (event) => {
    const file = event.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
        src.value = e.target.result;
    };

    reader.readAsDataURL(file);
}

</script>
