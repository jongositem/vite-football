import { getData } from "./libs/fetch";
import { iComment } from "./types/entity";

interface IComentRes {
  data: iComment[];
}
const API_URL = "https://v1.appbackend.io/v1/rows/PsboDkgFnGIY";

async function renderData() {
  const comments = await getData<IComentRes>(API_URL);
  if (!comments) {
    console.log("Apps error");
    return;
  }
  const CommentContainer = document.getElementById("CommentData");

  comments.data.forEach(commentItem => {
    const NewElement = document.createElement('li');

    const divElement = document.createElement('div');
    divElement.classList.add('activity__list__header');
    NewElement.appendChild(divElement);

    const randNum = Math.floor(Math.random() * 10);
    const imgAvatar = document.createElement('img');
    imgAvatar.src = "https://i.pravatar.cc/300?img=" + randNum;
    divElement.appendChild(imgAvatar);

    const divComment = document.createElement('div');
    divComment.classList.add('activity__list__body');
    divComment.classList.add('entry-content');

    NewElement.appendChild(divComment);


    const textComment = document.createElement('p');
    textComment.textContent = commentItem.comment;
    divComment.appendChild(textComment);

    const linkElement = document.createElement('a');
    linkElement.href = '#'
    linkElement.textContent = commentItem.name;
    divElement.appendChild(linkElement);

    const divFooter = document.createElement('div');
    divFooter.classList.add('activity__list__footer');

    const iconDelete = document.createElement('i');
    iconDelete.classList.add('fa');
    iconDelete.classList.add('fa-trash');

    const linkDelete = document.createElement('a');
    linkDelete.classList.add('linkdelete')
    linkDelete.href = '#';
    linkDelete.appendChild(iconDelete);
    linkDelete.onclick = async function(){
      const idna = commentItem._id
      try {
        await fetch(API_URL, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify([idna])
        })
            
      } catch (error) {
        console.log(error);
      } finally{
        window.location.reload();
      }
    }

    const txtDelete = new Text('Delete');
    linkDelete.appendChild(txtDelete);

    divFooter.appendChild(linkDelete)

    const iconUpdate = document.createElement('i');
    const dateUpdt = commentItem.updatedAt;
    const dateUpdate = new Date(dateUpdt);
    const spanFooter = document.createElement('span');
    spanFooter.textContent = dateUpdate.toLocaleString();
    divFooter.appendChild(spanFooter)


    iconUpdate.classList.add('fa');
    iconUpdate.classList.add('fa-clock');
    NewElement.appendChild(divFooter);

    CommentContainer?.appendChild(NewElement);


  });
  // comments.data.map((comment) =>{
  //   // const newNameComment = document.createElement("h1");
  //   // const newComment = document.createElement("p");
  //   // newNameComment.textContent = comment.name;
  //   // newComment.textContent = comment.comment;

  //   // document.body.append(newNameComment,newComment);
  // })
}
// add new data
const form = document.getElementById('formComment') as HTMLFormElement;
const inputName = document.getElementById('name') as HTMLInputElement;
const inputComment = document.getElementById('comment') as HTMLTextAreaElement;
const submitbtn = document.getElementById('submitbtn');

submitbtn?.addEventListener('click', async () => {
  const name = inputName.value;
  const comment = inputComment.value;
  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([{name,comment}])
    })
  } catch (error) {
    console.log(error);
  } finally{
    window.location.reload();
  }
})

//delete data
// function deleteRow(id:string){
//   onclick(alert(id));
// }


renderData();