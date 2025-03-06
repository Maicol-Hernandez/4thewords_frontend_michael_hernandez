<template>
    <FormKit type="form" @submit="handleSubmit" :actions="false">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormKit type="text" name="name" label="Nombre" validation="required" />

            <FormKit type="dropdown" name="category" label="Categoría" :options="categories" />

            <FileUpload @upload="handleImageUpload" />

            <DatePicker v-model="date" />

            <div class="space-y-4">
                <FormKit type="dropdown" name="province" label="Provincia" :options="provinces" @change="loadCantons" />
                <FormKit type="dropdown" name="canton" label="Cantón" :options="cantons" @change="loadDistricts" />
                <FormKit type="dropdown" name="district" label="Distrito" :options="districts" />
            </div>

            <FormKit type="textarea" name="description" label="Descripción" validation="required|length:100,500" />
        </div>

        <Button type="submit" label="Guardar" class="mt-6" />
    </FormKit>
</template>