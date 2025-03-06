<template>
    <div class="border-2 border-dashed rounded-lg p-4 text-center">
        <input type="file" @change="handleUpload" class="hidden" ref="fileInput" accept="image/*" />
        <div v-if="!preview" @click="$refs.fileInput.click()" class="cursor-pointer">
            <i class="pi pi-cloud-upload text-4xl text-primary-600"></i>
            <p class="mt-2 text-gray-600">Arrastra o haz click para subir</p>
        </div>
        <div v-else class="relative">
            <img :src="preview" class="w-full h-48 object-cover rounded-lg" />
            <Button icon="pi pi-times" class="absolute top-2 right-2" @click="clearFile" />
        </div>
    </div>
</template>