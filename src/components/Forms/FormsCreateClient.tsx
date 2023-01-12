import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createClientSchema } from '../../schemas/createClientFormsSchema';
import { useRouter } from 'next/router';
import { api } from '../../lib/api';
import { Client, Measures } from '@prisma/client';

type CreateClientSchema = z.infer<typeof createClientSchema>;

export const FormsCreateClient = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<CreateClientSchema>({
    resolver: zodResolver(createClientSchema),
  });

  const onSubmit: SubmitHandler<CreateClientSchema> = async (data) => {
    const currentUrl = document.location.origin;
    const receivedData = await api.post<Client & { measures: Measures }>(`${currentUrl}/api/client`, data);
    router.push(`/client/${receivedData.data.id}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Nome</label>
        <input type="text" id="name" {...register('name')}/>
        { errors.name && <p>{errors.name.message}</p> }
      </div>
      <div>
        <label htmlFor="birthDate">Data de nasc.</label>
        <input type="date" id="birthDate" {...register('birthDate', { valueAsDate: true })}/>
        { errors.birthDate && <p>{errors.birthDate.message}</p> }
      </div>
      <div>
        <label htmlFor="drink">Bebe</label>
        <select id="drink" {...register('drink')}>
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
      </div>
      <div>
        <label htmlFor="smoke">Fuma</label>
        <select id="smoke" {...register('smoke')}>
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
      </div>
      <div>
        <label htmlFor="children">Filhos</label>
        <input type="number" id="children" {...register('children')}/>
      </div>
      <div>
        <label htmlFor="sleep">Sono</label>
        <select id="sleep" {...register('sleep')}>
          <option value="Bom">Bom</option>
          <option value="Regular">Regular</option>
          <option value="Ruim">Ruim</option>
        </select>
      </div>
      <div>
        <label htmlFor="feeding">Alimentação</label>
        <select id="feeding" {...register('feeding')}>
          <option value="Bom">Bom</option>
          <option value="Regular">Regular</option>
          <option value="Ruim">Ruim</option>
        </select>
      </div>
      <div>
        <label htmlFor="drinkWater">Água</label>
        <input type="number" step={.01} id="drinkWater" {...register('drinkWater')}/>
      </div>
      <div>
        <label htmlFor="intestine">Intestino</label>
        <select id="intestine" {...register('intestine')}>
          <option value="Bom">Bom</option>
          <option value="Regular">Regular</option>
          <option value="Ruim">Ruim</option>
        </select>
      </div>
      <div>
        <label htmlFor="surgeries">Cirurgias</label>
        <input type="text" id="surgeries" {...register('surgeries')}/>
      </div>
      <div>
        <label htmlFor="illnesses">Doenças</label>
        <input type="text" id="illnesses" {...register('illnesses')}/>
      </div>
      <div>
        <label htmlFor="medicines">Remédios</label>
        <input type="text" id="medicines" {...register('medicines')}/>
      </div>
      <div>
        <label htmlFor="illnessesInFamily">Doenças na família</label>
        <input type="text" id="illnessesInFamily" {...register('illnessesInFamily')}/>
      </div>
      <div>
        <label htmlFor="mentalHealth">Saúde mental</label>
        <input type="text" id="mentalHealth" {...register('mentalHealth')}/>
      </div>
      <div>
        <label htmlFor="otherTreatments">Outros tratamentos</label>
        <input type="text" id="otherTreatments" {...register('otherTreatments')}/>
      </div>
      <div>
        <label htmlFor="indication">Indicação</label>
        <input type="text" id="indication" {...register('indication')}/>
      </div>
      <div>
        <label htmlFor="startingWeight">Peso Inicial</label>
        <input type="number" step={.01} id="startingWeight" {...register('startingWeight')}/>
      </div>
      <div>
        <label htmlFor="rightArm">Braço dir.</label>
        <input type="number" step={.01} id="rightArm" {...register('measures.rightArm')}/>
      </div>
      <div>
        <label htmlFor="leftArm">Braço esq.</label>
        <input type="number" step={.01} id="leftArm" {...register('measures.leftArm')}/>
      </div>
      <div>
        <label htmlFor="chest">Peito</label>
        <input type="number" step={.01} id="chest" {...register('measures.chest')}/>
      </div>
      <div>
        <label htmlFor="waist">Cintura</label>
        <input type="number" step={.01} id="waist" {...register('measures.waist')}/>
      </div>
      <div>
        <label htmlFor="hips">Ancas</label>
        <input type="number" step={.01} id="hips" {...register('measures.hips')}/>
      </div>
      <div>
        <label htmlFor="butt">Bumbum</label>
        <input type="number" step={.01} id="butt" {...register('measures.butt')}/>
      </div>
      <div>
        <label htmlFor="rightThigh">Coxa dir.</label>
        <input type="number" step={.01} id="rightThigh" {...register('measures.rightThigh')}/>
      </div>
      <div>
        <label htmlFor="leftThigh">Coxa esq.</label>
        <input type="number" step={.01} id="leftThigh" {...register('measures.leftThigh')}/>
      </div>
      <div>
        <label htmlFor="rightCalf">Batata dir.</label>
        <input type="number" step={.01} id="rightCalf" {...register('measures.rightCalf')}/>
      </div>
      <div>
        <label htmlFor="leftCalf">Batata esq.</label>
        <input type="number" step={.01} id="leftCalf" {...register('measures.leftCalf')}/>
      </div>
      <div>
        <label htmlFor="height">Altura</label>
        <input type="number" step={.01} id="height" {...register('measures.height')}/>
      </div>
      <div>
        <label htmlFor="description">Descrição</label>
        <textarea id="description" cols={30} rows={10} {...register('description')}></textarea>
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  );
};

