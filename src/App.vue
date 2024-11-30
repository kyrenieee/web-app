<template>
  <div class="w-screen h-screen bg-green-200">
    <h1 class="text-xl font-bold text-center">CRUD Application</h1>
    <div class="p-4">
      <!-- Form for adding/updating entries -->
      <form @submit.prevent="handleSubmit" class="mb-4">
        <input
          v-model="form.productId"
          placeholder="Product ID"
          class="p-2 m-2 border"
        />
        <input
          v-model="form.customerId"
          placeholder="Customer ID"
          class="p-2 m-2 border"
        />
        <input
          v-model="form.firstName"
          placeholder="First Name"
          class="p-2 m-2 border"
        />
        <input
          v-model="form.lastName"
          placeholder="Last Name"
          class="p-2 m-2 border"
        />
        <button class="px-4 py-2 text-white bg-blue-500 cursor-pointer">
          Submit
        </button>
      </form>

      <!-- Data Table -->
      <table class="w-full border border-collapse border-gray-800">
        <thead>
          <tr>
            <th class="p-2 border border-gray-600">Product ID</th>
            <th class="p-2 border border-gray-600">Customer ID</th>
            <th class="p-2 border border-gray-600">First Name</th>
            <th class="p-2 border border-gray-600">Last Name</th>
            <th class="p-2 border border-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index">
            <td class="p-2 border border-gray-600">{{ item.productId }}</td>
            <td class="p-2 border border-gray-600">{{ item.customerId }}</td>
            <td class="p-2 border border-gray-600">{{ item.firstName }}</td>
            <td class="p-2 border border-gray-600">{{ item.lastName }}</td>
            <td class="p-2 border border-gray-600">
              <button
                @click="editItem(index)"
                class="px-2 py-1 bg-yellow-400 cursor-pointer"
              >
                Edit
              </button>
              <button
                @click="deleteItem(item.productId)"
                class="px-2 py-1 text-white bg-red-500 cursor-pointer"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        productId: "",
        customerId: "",
        firstName: "",
        lastName: "",
      },
      data: [],
    };
  },
  methods: {
    async fetchData() {
      try {
        console.log("Fetching data...");
        const response = await axios.get("https://your-api-url.com/items");
        this.data = response.data;
        console.log("Data fetched:", this.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async handleSubmit() {
      try {
        if (this.form.productId) {
          console.log("Updating item:", this.form);
          await axios.put(
            `https://your-api-url.com/items/${this.form.productId}`,
            this.form
          );
        } else {
          console.log("Creating item:", this.form);
          await axios.post("https://your-api-url.com/items", this.form);
        }
        this.fetchData();
        this.resetForm();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    editItem(index) {
      console.log("Editing item:", this.data[index]);
      this.form = { ...this.data[index] };
    },
    async deleteItem(productId) {
      try {
        console.log("Deleting item with ID:", productId);
        await axios.delete(`https://your-api-url.com/items/${productId}`);
        this.fetchData();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    },
    resetForm() {
      console.log("Resetting form");
      this.form = {
        productId: "",
        customerId: "",
        firstName: "",
        lastName: "",
      };
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
